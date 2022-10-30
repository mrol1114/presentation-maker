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
    if (presentationMaker.currentSlidesGroupIndex <= 0)
    {
        return presentationMaker;
    }

    const newSlidesGroupIndex: number =  presentationMaker.currentSlidesGroupIndex - 1;

    return {
        ...presentationMaker,
        slidesGroup: presentationMaker.localHistory[newSlidesGroupIndex],
        currentSlidesGroupIndex: newSlidesGroupIndex
    };
}

function redo(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    if (presentationMaker.currentSlidesGroupIndex === presentationMaker.localHistory.length - 1)
    {
        return presentationMaker;
    }

    const newSlidesGroupIndex: number = presentationMaker.currentSlidesGroupIndex + 1;
    
    return {
        ...presentationMaker,
        slidesGroup: presentationMaker.localHistory[newSlidesGroupIndex],
        currentSlidesGroupIndex: newSlidesGroupIndex
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
        ...presentationMaker.slidesGroup,
        newSlide
    ];

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1,
        currentSlideIndex: presentationMaker.currentSlideIndex >= 0 ? presentationMaker.currentSlideIndex + 1 : 0,
        selectedSlidesIndexes: [newSlidesGroup.length - 1]
    };
}

function deleteSlides(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const newSelectedSlidesIndexes: number[] = [...presentationMaker.selectedSlidesIndexes];

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.filter((_, index) => !newSelectedSlidesIndexes.includes(index));

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1,
        currentSlideIndex: newSlidesGroup.length > 0 ? 0 : -1,
        selectedSlidesIndexes: [],
        selectedAreasIndexes: [],
        currentAreaIndex: -1,
    };
}

function moveSlide(presentationMaker: types.PresentationMaker, insertPos: number): types.PresentationMaker
{
    if (insertPos < 0 || insertPos > presentationMaker.slidesGroup.length)
    {
        return presentationMaker;
    }

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.filter((_, index) => {
        return !presentationMaker.selectedSlidesIndexes.includes(index);
    });

    const selectedSlides: types.Slide[] = presentationMaker.selectedSlidesIndexes.map((index) => {
        return presentationMaker.slidesGroup[index];
    });

    newSlidesGroup.splice(insertPos, 0, ...selectedSlides);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1,
        currentSlideIndex: insertPos,
        selectedSlidesIndexes: newSlidesGroup.map((value, index) => selectedSlides.includes(value) ? index : -1).filter(value => value !== -1)
    };
}

// работа с слайдом

function updateSlideProperty(presentationMaker: types.PresentationMaker, updatedSlide: types.UpdatedSlide): types.PresentationMaker
{
    if (presentationMaker.slidesGroup.length === 0)
    {
        return presentationMaker;
    }

    const currentSlideIndex: number = presentationMaker.currentSlideIndex;
    const currentSlide: types.Slide = presentationMaker.slidesGroup[currentSlideIndex];

    const newSlide: types.Slide = {
        ...currentSlide,
        backgroundColor: updatedSlide.backgroundColor ?? currentSlide.backgroundColor,
        backgroundImage: updatedSlide.backgroundImage ?? currentSlide.backgroundImage
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.map((slide, index) => index === currentSlideIndex ? newSlide : slide);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory.slice(0, presentationMaker.currentSlidesGroupIndex + 1),
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1
    };
}

function addArea(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const currentSlideIndex: number = presentationMaker.currentSlideIndex;
    if (currentSlideIndex === consts.notSelectedIndex)
    {
        return presentationMaker;
    }

    const curSlide: types.Slide = presentationMaker.slidesGroup[currentSlideIndex];
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

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.map((slide, index) => index === currentSlideIndex ? newSlide : slide);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory.slice(0, presentationMaker.currentSlidesGroupIndex + 1),
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1,
        currentAreaIndex: newSlide.areas.length - 1
    };
}

function deleteAreas(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const curSlideIndex: number = presentationMaker.currentSlideIndex;
    if (curSlideIndex === consts.notSelectedIndex)
    {
        return presentationMaker;
    }
  
    const curSlide: types.Slide = presentationMaker.slidesGroup[curSlideIndex]; 
    const newSlide: types.Slide = {
        ...curSlide,
        areas: curSlide.areas.filter((_, index) => !presentationMaker.selectedAreasIndexes.includes(index))
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.map((slide, index) => index === curSlideIndex ? newSlide : slide);
    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory.slice(0, presentationMaker.currentSlidesGroupIndex + 1),
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1,
        currentAreaIndex: consts.notSelectedIndex,
        selectedAreasIndexes: []
    };
}

function selectAreas(presentationMaker: types.PresentationMaker, selectedAreas: number[]): types.PresentationMaker
{
    const curSlideIndex: number = presentationMaker.currentSlideIndex;
    if (curSlideIndex !== consts.notSelectedIndex)
    {
        return presentationMaker;
    }

    const areasIndexes: number[] = [...selectedAreas];
    const curSlide: types.Slide = presentationMaker.slidesGroup[curSlideIndex];
    if (curSlide.areas.length < areasIndexes.sort((int1: number, int2: number) => int2 - int1)[0] || areasIndexes.find((int: number) => int < 0))
    {
        return presentationMaker;
    }
 

    return {
        ...presentationMaker,
        selectedAreasIndexes: [...presentationMaker.selectedAreasIndexes, ...selectedAreas]
    };
}

function unselectAreas(presentationMaker: types.PresentationMaker, selectedAreas: number[]): types.PresentationMaker
{
    const curSlideIndex: number = presentationMaker.currentSlideIndex;
    if (curSlideIndex !== consts.notSelectedIndex)
    {
        return presentationMaker;
    }

    const areasIndexes: number[] = [...selectedAreas];
    const curSlide: types.Slide = presentationMaker.slidesGroup[curSlideIndex];
    if (curSlide.areas.length < areasIndexes.sort((int1: number, int2: number) => int2 - int1)[0] || areasIndexes.find((int: number) => int < 0))
    {
        return presentationMaker;
    }
 

    return {
        ...presentationMaker,
        selectedAreasIndexes: presentationMaker.selectedAreasIndexes.filter((index: number) => !selectedAreas.includes(index))
    };
}

function assignAreaIndex(presentationMaker: types.PresentationMaker, areaIndex: number): types.PresentationMaker
{
    const curSlideIndex: number = presentationMaker.currentSlideIndex;
    if (presentationMaker.slidesGroup.length === 0)
    {
        return presentationMaker;
    }

    const curSlide: types.Slide = presentationMaker.slidesGroup[curSlideIndex]; 
    if (areaIndex < 0 && areaIndex !== consts.notSelectedIndex && curSlide.areas.length < areaIndex)
    {
        return presentationMaker;
    }

    return {
        ...presentationMaker,
        currentAreaIndex: areaIndex
    };
}

// работа с областью

function updateArea(presentationMaker: types.PresentationMaker, updatedArea: types.UpdatedArea): types.PresentationMaker
{
    const currIdSlide: number = presentationMaker.currentSlideIndex;
    const currIdArea: number = presentationMaker.currentAreaIndex;

    if (currIdArea === -1)
    {
        return presentationMaker;
    }

    const currentSlide: types.Slide = presentationMaker.slidesGroup[currIdSlide];
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

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.map((value, index) => index === currIdSlide ? newSlide : value);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1
    };
}

// работа с текстом

function updateText(presentationMaker: types.PresentationMaker, updatedText: types.UpdatedTextInfo): types.PresentationMaker
{
    const currentSlideIndex: number = presentationMaker.currentSlideIndex;
    const currentAreaIndex: number = presentationMaker.currentAreaIndex;

    if (currentAreaIndex === -1 || currentSlideIndex === -1)
    {
        return presentationMaker;
    }

    const currentAreaInfo: types.AreaContent|undefined = presentationMaker.slidesGroup[currentSlideIndex].areas[currentAreaIndex].contains;
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
        ...presentationMaker.slidesGroup[currentSlideIndex].areas[currentAreaIndex],
        contains: textInfo
    }

    const newSlide: types.Slide = {
        ...presentationMaker.slidesGroup[currentSlideIndex],
        areas: presentationMaker.slidesGroup[currentSlideIndex].areas.map((value, index) => index === currentAreaIndex ? newArea : value)
    };

    const newSlidesGroup = presentationMaker.slidesGroup.map((value, index) => index === currentSlideIndex ? newSlide : value);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1
    };
}

function createText(presentationMaker: types.PresentationMaker): types.PresentationMaker
{
    const currentSlideIndex: number = presentationMaker.currentSlideIndex;
    const currentAreaIndex: number = presentationMaker.currentAreaIndex;

    if (currentAreaIndex === -1 || currentSlideIndex === -1 || presentationMaker.slidesGroup[currentSlideIndex].areas[currentAreaIndex].contains !== undefined)
    {
        return presentationMaker;
    }

    const newArea: types.Area = {
        ...presentationMaker.slidesGroup[currentSlideIndex].areas[currentAreaIndex],
        contains: {...consts.defaultTextInfo}
    }

    const newSlide: types.Slide = {
        ...presentationMaker.slidesGroup[currentSlideIndex],
        areas: presentationMaker.slidesGroup[currentSlideIndex].areas.map((value, index) => index === currentAreaIndex ? newArea : value)
    };

    const newSlidesGroup = presentationMaker.slidesGroup.map((value, index) => index === currentSlideIndex ? newSlide : value);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1
    };
}

// работа с картинкой

function createImage(presentationMaker: types.PresentationMaker, imageInfo: types.ImageInfo): types.PresentationMaker
{
    const currentSlideIndex: number = presentationMaker.currentSlideIndex;
    const currentAreaIndex: number = presentationMaker.currentAreaIndex;

    if (presentationMaker.slidesGroup[currentSlideIndex].areas[currentAreaIndex].contains !== undefined)
    {
        return presentationMaker;
    }

    const newArea: types.Area = {
        ...presentationMaker.slidesGroup[currentSlideIndex].areas[currentAreaIndex],
        contains: imageInfo
    };

    const newSlide: types.Slide = {
        ...presentationMaker.slidesGroup[currentSlideIndex],
        areas: presentationMaker.slidesGroup[currentSlideIndex].areas.map((value, index) => index === currentAreaIndex ? newArea : value)
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.map((value, index) => index === currentSlideIndex ? newSlide : value);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1
    };
}

// работа с графическим примитивом

function updateGraphicPrimitive(presentationMaker: types.PresentationMaker, updatedGraphicPrimitiveInfo: types.UpdatedGraphicPrimitiveInfo): types.PresentationMaker
{
    const currIdSlide: number = presentationMaker.currentSlideIndex;
    const currIdArea: number = presentationMaker.currentAreaIndex;
    const areaContentInfo: types.AreaContent|undefined = presentationMaker.slidesGroup[currIdSlide].areas[currIdArea].contains;

    if (!areaContentInfo || areaContentInfo.type !== 'primitive')
    {
        return presentationMaker;
    }

    const newGraphicPrimitiveInfo: types.GraphicPrimitiveInfo = {
        type: areaContentInfo.type,
        color: updatedGraphicPrimitiveInfo.color ?? areaContentInfo.color,
        borderColor: updatedGraphicPrimitiveInfo.borderColor ?? areaContentInfo.borderColor,
        primitive: updatedGraphicPrimitiveInfo.primitive ?? areaContentInfo.primitive
    };

    const newArea: types.Area = {
        ...presentationMaker.slidesGroup[currIdSlide].areas[currIdArea],
        contains: newGraphicPrimitiveInfo
    };

    const newSlide: types.Slide = {
        ...presentationMaker.slidesGroup[currIdSlide],
        areas: presentationMaker.slidesGroup[currIdSlide].areas.map((value, index) => index === currIdArea ? newArea : value)
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.map((value, index) => index === currIdSlide ? newSlide : value);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1
    };
}

function createGraphicPrimitive(presentationMaker: types.PresentationMaker, type: types.Primitive): types.PresentationMaker
{   
    const currentSlideIndex: number = presentationMaker.currentSlideIndex;
    const currentAreaIndex: number = presentationMaker.currentAreaIndex;

    if (presentationMaker.slidesGroup[currentSlideIndex].areas[currentAreaIndex].contains !== undefined)
    {
        return presentationMaker;
    }

    const newGraphicPrimitiveInfo: types.GraphicPrimitiveInfo = {
        ...consts.defaultGraphicPrimitiveInfo,
        primitive: type
    };

    const newArea: types.Area = {
        ...presentationMaker.slidesGroup[currentSlideIndex].areas[currentAreaIndex],
        contains: newGraphicPrimitiveInfo
    };

    const newSlide: types.Slide = {
        ...presentationMaker.slidesGroup[currentSlideIndex],
        areas: presentationMaker.slidesGroup[currentSlideIndex].areas.map((value, index) => index === currentAreaIndex ? newArea : value)  
    };

    const newSlidesGroup: types.Slide[] = presentationMaker.slidesGroup.map((value, index) => index === currentSlideIndex ? newSlide : value);

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup
        ],
        slidesGroup: newSlidesGroup,
        currentSlidesGroupIndex: presentationMaker.currentSlidesGroupIndex + 1
    };
}

export {};