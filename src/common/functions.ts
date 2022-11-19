import type * as types from './types';
import * as consts from './consts';
import { Ids } from './variables';

// загрузка, выгрузка

/*function download(): PresentationMaker
{

}

function convertPresentationMakerToJson(presentationMaker: PresentationMaker): JSON
{

}

function convertJsonToPresentationMaker(json: JSON): PresentationMaker
{

}

function save(obj: SaveObj): void
{

}

function convertPdf(presentationMaker: PresentationMaker): Pdf
{

}*/

// работа с локальной историей

function undo(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    if (presentationMaker.currentPresentationElementsIndex <= 0)
    {
        return presentationMaker;
    }

    const newPresentationElements: number = presentationMaker.currentPresentationElementsIndex - 1;

    return {
        ...presentationMaker,
        presentationElements: {
            ...presentationMaker.localHistory[newPresentationElements]
        },
        currentPresentationElementsIndex: newPresentationElements
    };
}

function redo(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    if (presentationMaker.currentPresentationElementsIndex === presentationMaker.localHistory.length - 1)
    {
        return presentationMaker;
    }

    const newPresentationElements: number = presentationMaker.currentPresentationElementsIndex + 1;
    
    return {
        ...presentationMaker,
        presentationElements: {
            ...presentationMaker.localHistory[newPresentationElements]
        },
        currentPresentationElementsIndex: newPresentationElements
    };
}

// работа с группой слайдов

function addSlide(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const newSlide: types.Slide = {
        ...consts.defaultSlideValues,
        id: Ids.lastSlideId++
    };

    const newSlidesGroup: types.Slide[] = [
        ...presentationMaker.presentationElements.slidesGroup,
        newSlide
    ];

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup,
        currentSlideIndex: presentationMaker.presentationElements.currentSlideIndex >= 0 
            ? presentationMaker.presentationElements.currentSlideIndex + 1 : 0
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function deleteSlides(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const newSelectedSlidesIndexes: number[] = [...presentationMaker.presentationElements.selectedSlidesIndexes];

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.filter(
        (_, index) => !newSelectedSlidesIndexes.includes(index));

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup,
        currentSlideIndex: newSlidesGroup.length > 0 ? 0 : -1,
        selectedSlidesIndexes: [],
        selectedAreasIndexes: [],
        currentAreaIndex: -1
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function moveSlides(presentationMaker: types.PresentationMaker, insertPos: number): types.PresentationMaker
{
    if (insertPos < 0 || insertPos > presentationMaker.presentationElements.slidesGroup.length)
    {
        return presentationMaker;
    }

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.filter((_, index) => {
        return !presentationMaker.presentationElements.selectedSlidesIndexes.includes(index);
    });

    const selectedSlides: types.Slide[] = presentationMaker.presentationElements.selectedSlidesIndexes.map((index) => {
        return presentationMaker.presentationElements.slidesGroup[index];
    });

    newSlidesGroup.splice(insertPos, 0, ...selectedSlides);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup,
        currentSlideIndex: insertPos,
        selectedSlidesIndexes: newSlidesGroup.map((value, index) => selectedSlides.includes(value) ? index : -1).filter(value => value !== -1)
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function selectSlides(presentationMaker: types.PresentationMaker, selectedSlides: number[]): types.PresentationMaker
{
    if (!presentationMaker.presentationElements.slidesGroup.length)
    {
        return presentationMaker;
    }

    const slidesIndexes: number[] = [...selectedSlides];
    if (presentationMaker.presentationElements.slidesGroup.length <= slidesIndexes.sort((int1: number, int2: number) => int2 - int1)[0] 
        || slidesIndexes.find((int: number) => int < 0) 
        || slidesIndexes.filter((value, index) => slidesIndexes.indexOf(value) !== index).length  
        || slidesIndexes.find(value => value === presentationMaker.presentationElements.currentSlideIndex))
    {
        return presentationMaker;
    }

    const currSlideIndex: number[] = presentationMaker.presentationElements.currentSlideIndex !== consts.notSelectedIndex 
        ? [presentationMaker.presentationElements.currentSlideIndex] : [];

    const selectedSlidesIndexes: number[] = presentationMaker.presentationElements.selectedSlidesIndexes.length 
        ? [...presentationMaker.presentationElements.selectedSlidesIndexes] : currSlideIndex;

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        selectedSlidesIndexes: [...selectedSlidesIndexes, ...selectedSlides],
        selectedAreasIndexes: [],
        currentSlideIndex: selectedSlides[selectedSlides.length - 1],
        currentAreaIndex: consts.notSelectedIndex
    }

    return {
        ...presentationMaker,
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function unselectSlides(presentationMaker: types.PresentationMaker, unselectedSlides: number[]): types.PresentationMaker
{
    if (!presentationMaker.presentationElements.slidesGroup.length)
    {
        return presentationMaker;
    }

    const slidesIndexes: number[] = [...unselectedSlides];
    if (presentationMaker.presentationElements.slidesGroup.length <= unselectedSlides.sort((int1: number, int2: number) => int2 - int1)[0] 
        || slidesIndexes.find((int: number) => int < 0))
    {
        return presentationMaker;
    }

    const newSelectedSlidesIndexes: number[] = presentationMaker.presentationElements.selectedSlidesIndexes.filter(
        (index: number) => !slidesIndexes.includes(index));

    const newCurrSlideIndex: number = newSelectedSlidesIndexes.length ? newSelectedSlidesIndexes[0] : slidesIndexes[0];

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        currentSlideIndex: newSelectedSlidesIndexes.length - 1 > 0 
            ? newSelectedSlidesIndexes[newSelectedSlidesIndexes.length - 1] : newCurrSlideIndex,
        selectedSlidesIndexes: newSelectedSlidesIndexes.length > 1 ? newSelectedSlidesIndexes : []
    }

    return {
        ...presentationMaker,
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function assignSlideIndex(presentationMaker: types.PresentationMaker, slideIndex: number): types.PresentationMaker
{
    if (presentationMaker.presentationElements.slidesGroup.length === 0 || slideIndex < 0 
        || presentationMaker.presentationElements.slidesGroup.length <= slideIndex)
    {
        return presentationMaker;
    }

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        currentSlideIndex: slideIndex,
        currentAreaIndex: consts.notSelectedIndex,
        selectedSlidesIndexes: [],
        selectedAreasIndexes: []
    }

    return {
        ...presentationMaker,
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

// работа с слайдом

function updateSlideProperty(presentationMaker: types.PresentationMaker, updatedSlide: types.UpdatedSlide): types.PresentationMaker
{
    if (presentationMaker.presentationElements.slidesGroup.length === 0)
    {
        return presentationMaker;
    }

    const currentSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    const currentSlide: types.Slide = presentationMaker.presentationElements.slidesGroup[currentSlideIndex];

    const newSlide: types.Slide = {
        ...currentSlide,
        backgroundColor: updatedSlide.backgroundColor ?? currentSlide.backgroundColor,
        backgroundImage: updatedSlide.backgroundImage ?? currentSlide.backgroundImage
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.map(
        (slide, index) => index === currentSlideIndex ? newSlide : slide);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory.slice(0, presentationMaker.currentPresentationElementsIndex + 1),
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function addArea(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const currentSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    if (currentSlideIndex === consts.notSelectedIndex)
    {
        return presentationMaker;
    }

    const curSlide: types.Slide = presentationMaker.presentationElements.slidesGroup[currentSlideIndex];
    const lastArea: types.Area|undefined = curSlide.areas.length > 0 ? curSlide.areas[curSlide.areas.length - 1] : undefined;

    const newArea: types.Area = {
        ...consts.defaultAreaValues,
        id: lastArea ? lastArea.id + 1 : 0,
        zIndex: lastArea ? lastArea.zIndex + 1 : 0 
    };

    const newSlide: types.Slide = {
        ...curSlide,
        areas: [...curSlide.areas, newArea]
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.map(
        (slide, index) => index === currentSlideIndex ? newSlide : slide);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup,
        currentAreaIndex: newSlide.areas.length - 1
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory.slice(0, presentationMaker.currentPresentationElementsIndex + 1),
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function deleteAreas(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const curSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    if (curSlideIndex === consts.notSelectedIndex)
    {
        return presentationMaker;
    }
  
    const curSlide: types.Slide = presentationMaker.presentationElements.slidesGroup[curSlideIndex]; 
    const newSlide: types.Slide = {
        ...curSlide,
        areas: curSlide.areas.filter((_, index) => !presentationMaker.presentationElements.selectedAreasIndexes.includes(index))
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.map(
        (slide, index) => index === curSlideIndex ? newSlide : slide);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup,
        currentAreaIndex: consts.notSelectedIndex,
        selectedAreasIndexes: []
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory.slice(0, presentationMaker.currentPresentationElementsIndex + 1),
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function selectAreas(presentationMaker: types.PresentationMaker, selectedAreas: number[]): types.PresentationMaker
{
    const curSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    if (curSlideIndex === consts.notSelectedIndex || !selectedAreas.length)
    {
        return presentationMaker;
    }

    const areasIndexes: number[] = [...selectedAreas];
    const curSlide: types.Slide = presentationMaker.presentationElements.slidesGroup[curSlideIndex];
    if (curSlide.areas.length <= areasIndexes.sort((int1: number, int2: number) => int2 - int1)[0] 
        || areasIndexes.find((int: number) => int < 0) 
        || areasIndexes.filter((value, index) => areasIndexes.indexOf(value) !== index).length 
        || areasIndexes.find(value => value === presentationMaker.presentationElements.currentAreaIndex))
    {
        return presentationMaker;
    }

    const selectedAreasIndexes: number[] = presentationMaker.presentationElements.selectedAreasIndexes.length ? 
    [...presentationMaker.presentationElements.selectedAreasIndexes] : [presentationMaker.presentationElements.currentAreaIndex];

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        selectedSlidesIndexes: [],
        selectedAreasIndexes: [...selectedAreasIndexes, ...selectedAreas],
        currentAreaIndex: consts.notSelectedIndex
    }

    return {
        ...presentationMaker,
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function unselectAreas(presentationMaker: types.PresentationMaker, selectedAreas: number[]): types.PresentationMaker
{
    const curSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    if (curSlideIndex === consts.notSelectedIndex)
    {
        return presentationMaker;
    }

    const areasIndexes: number[] = [...selectedAreas];
    const curSlide: types.Slide = presentationMaker.presentationElements.slidesGroup[curSlideIndex];
    if (curSlide.areas.length <= areasIndexes.sort((int1: number, int2: number) => int2 - int1)[0] 
        || areasIndexes.find((int: number) => int < 0))
    {
        return presentationMaker;
    }

    const newSelectedAreasIndexes: number[] = presentationMaker.presentationElements.selectedAreasIndexes.filter(
        (index: number) => !selectedAreas.includes(index));

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        currentAreaIndex: newSelectedAreasIndexes.length - 1 > 0 ? 
            consts.notSelectedIndex : 
            newSelectedAreasIndexes[newSelectedAreasIndexes.length - 1],
        selectedAreasIndexes: newSelectedAreasIndexes.length > 1 ? newSelectedAreasIndexes : []
    }
 
    return {
        ...presentationMaker,
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function assignAreaIndex(presentationMaker: types.PresentationMaker, areaIndex: number): types.PresentationMaker
{
    const curSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    if (!presentationMaker.presentationElements.slidesGroup.length)
    {
        return presentationMaker;
    }

    const curSlide: types.Slide = presentationMaker.presentationElements.slidesGroup[curSlideIndex]; 
    if (areaIndex < 0 || curSlide.areas.length <= areaIndex)
    {
        return presentationMaker;
    }

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        currentAreaIndex: areaIndex,
        selectedSlidesIndexes: [],
        selectedAreasIndexes: []
    }

    return {
        ...presentationMaker,
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

// работа с областью

function updateArea(presentationMaker: types.PresentationMaker, updatedArea: types.UpdatedArea): types.PresentationMaker
{
    const currIdSlide: number = presentationMaker.presentationElements.currentSlideIndex;
    const currIdArea: number = presentationMaker.presentationElements.currentAreaIndex;

    if (currIdArea === consts.notSelectedIndex || currIdSlide === consts.notSelectedIndex)
    {
        return presentationMaker;
    }

    const currentSlide: types.Slide = presentationMaker.presentationElements.slidesGroup[currIdSlide];
    const currentArea: types.Area = currentSlide.areas[currIdArea];

    const newArea: types.Area = {
        ...currentArea,
        x: updatedArea.x ?? currentArea.x,
        y: updatedArea.y ?? currentArea.y,
        width: updatedArea.width ?? currentArea.width,
        height: updatedArea.height ?? currentArea.height,
        zIndex: updatedArea.zIndex ?? currentArea.zIndex
    };

    const newSlide: types.Slide = {
        ...currentSlide,
        areas: currentSlide.areas.map((value, index) => index === currIdArea ? newArea : value)
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.map(
        (value, index) => index === currIdSlide ? newSlide : value);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

// работа с текстом

function updateText(presentationMaker: types.PresentationMaker, updatedText: types.UpdatedTextInfo): types.PresentationMaker
{
    const currentSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    const currentAreaIndex: number = presentationMaker.presentationElements.currentAreaIndex;

    if (currentAreaIndex === consts.notSelectedIndex || currentSlideIndex === consts.notSelectedIndex)
    {
        return presentationMaker;
    }

    const currentAreaInfo: types.AreaContent|undefined = 
        presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas[currentAreaIndex].contains;
    if (!currentAreaInfo || currentAreaInfo.type !== 'text')
    {
        return presentationMaker;
    }

    const textInfo: types.TextInfo = {
        ...currentAreaInfo,
        color: updatedText.color ?? currentAreaInfo.color,
        borderColor: updatedText.borderColor ?? currentAreaInfo.borderColor,
        fontSize: updatedText.fontSize ?? currentAreaInfo.fontSize,
        font: updatedText.font ?? currentAreaInfo.font,
        weight: updatedText.weight ?? currentAreaInfo.weight,
        text: updatedText.text ?? currentAreaInfo.text
    };

    const newArea: types.Area = {
        ...presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas[currentAreaIndex],
        contains: textInfo
    }

    const newSlide: types.Slide = {
        ...presentationMaker.presentationElements.slidesGroup[currentSlideIndex],
        areas: presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas.map(
            (value, index) => index === currentAreaIndex ? newArea : value)
    };

    const newSlidesGroup = presentationMaker.presentationElements.slidesGroup.map(
        (value, index) => index === currentSlideIndex ? newSlide : value);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function createText(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const currentSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    const currentAreaIndex: number = presentationMaker.presentationElements.currentAreaIndex;

    if (currentAreaIndex === consts.notSelectedIndex || currentSlideIndex === consts.notSelectedIndex 
        || presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas[currentAreaIndex].contains)
    {
        return presentationMaker;
    }

    const newArea: types.Area = {
        ...presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas[currentAreaIndex],
        contains: {...consts.defaultTextInfo}
    }

    const newSlide: types.Slide = {
        ...presentationMaker.presentationElements.slidesGroup[currentSlideIndex],
        areas: presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas.map(
            (value, index) => index === currentAreaIndex ? newArea : value)
    };

    const newSlidesGroup = presentationMaker.presentationElements.slidesGroup.map(
        (value, index) => index === currentSlideIndex ? newSlide : value);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

// работа с картинкой

function createImage(presentationMaker: types.PresentationMaker, imageInfo: types.ImageInfo): types.PresentationMaker
{
    const currentSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    const currentAreaIndex: number = presentationMaker.presentationElements.currentAreaIndex;

    if (currentAreaIndex === consts.notSelectedIndex || currentSlideIndex === consts.notSelectedIndex 
        || presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas[currentAreaIndex].contains)
    {
        return presentationMaker;
    }

    const newArea: types.Area = {
        ...presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas[currentAreaIndex],
        contains: imageInfo
    };

    const newSlide: types.Slide = {
        ...presentationMaker.presentationElements.slidesGroup[currentSlideIndex],
        areas: presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas.map(
            (value, index) => index === currentAreaIndex ? newArea : value)
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.map(
        (value, index) => index === currentSlideIndex ? newSlide : value);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

// работа с графическим примитивом

function updateGraphicPrimitive(
    presentationMaker: types.PresentationMaker, 
    updatedGraphicPrimitiveInfo: types.UpdatedGraphicPrimitiveInfo): types.PresentationMaker
{
    const currIdSlide: number = presentationMaker.presentationElements.currentSlideIndex;
    const currIdArea: number = presentationMaker.presentationElements.currentAreaIndex;

    if (currIdArea === consts.notSelectedIndex || currIdSlide === consts.notSelectedIndex)
    {
        return presentationMaker;
    }

    const areaContentInfo: types.AreaContent|undefined = 
        presentationMaker.presentationElements.slidesGroup[currIdSlide].areas[currIdArea].contains;
    if (!areaContentInfo || areaContentInfo.type !== 'primitive')
    {
        return presentationMaker;
    }

    const newGraphicPrimitiveInfo: types.GraphicPrimitiveInfo = {
        type: areaContentInfo.type,
        color: updatedGraphicPrimitiveInfo.color ?? areaContentInfo.color,
        strokeColor: updatedGraphicPrimitiveInfo.strokeColor ?? areaContentInfo.strokeColor,
        strokeWidth: updatedGraphicPrimitiveInfo.strokeWidth ?? areaContentInfo.strokeWidth,
        primitive: updatedGraphicPrimitiveInfo.primitive ?? areaContentInfo.primitive
    };

    const newArea: types.Area = {
        ...presentationMaker.presentationElements.slidesGroup[currIdSlide].areas[currIdArea],
        contains: newGraphicPrimitiveInfo
    };

    const newSlide: types.Slide = {
        ...presentationMaker.presentationElements.slidesGroup[currIdSlide],
        areas: presentationMaker.presentationElements.slidesGroup[currIdSlide].areas.map(
            (value, index) => index === currIdArea ? newArea : value)
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.map(
        (value, index) => index === currIdSlide ? newSlide : value);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

function createGraphicPrimitive(presentationMaker: types.PresentationMaker, type: types.Primitive): types.PresentationMaker
{   
    const currentSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    const currentAreaIndex: number = presentationMaker.presentationElements.currentAreaIndex;

    if (currentAreaIndex === consts.notSelectedIndex || currentSlideIndex === consts.notSelectedIndex 
        || presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas[currentAreaIndex].contains)
    {
        return presentationMaker;
    }

    const newGraphicPrimitiveInfo: types.GraphicPrimitiveInfo = {
        ...consts.defaultGraphicPrimitiveInfo,
        primitive: type
    };

    const newArea: types.Area = {
        ...presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas[currentAreaIndex],
        contains: newGraphicPrimitiveInfo
    };

    const newSlide: types.Slide = {
        ...presentationMaker.presentationElements.slidesGroup[currentSlideIndex],
        areas: presentationMaker.presentationElements.slidesGroup[currentSlideIndex].areas.map(
            (value, index) => index === currentAreaIndex ? newArea : value)  
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.presentationElements.slidesGroup.map(
        (value, index) => index === currentSlideIndex ? newSlide : value);

    const newPresentationElements: types.PresentationElements = {
        ...presentationMaker.presentationElements,
        slidesGroup: newSlidesGroup
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newPresentationElements
        ],
        presentationElements: newPresentationElements,
        currentPresentationElementsIndex: presentationMaker.currentPresentationElementsIndex + 1
    };
}

export {
    undo,
    redo,
    addSlide,
    moveSlides,
    deleteSlides,
    selectSlides,
    unselectSlides,
    assignSlideIndex,
    addArea,
    deleteAreas,
    selectAreas,
    unselectAreas,
    assignAreaIndex,
    updateSlideProperty,
    updateArea,
    updateText,
    createText,
    createImage,
    createGraphicPrimitive,
    updateGraphicPrimitive,
};