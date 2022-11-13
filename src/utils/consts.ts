import type * as types from './types';

const notSelectedIndex = -1;

const presentationSlidesGroup: types.Slide[] = [
    {
        id: 0,
        areas: [
            {
                id: 0,
                x: 100,
                y: 100,
                width: 200,
                height: 200,
                zIndex: 1,
                contains: {
                    type: 'primitive',
                    color: 'black',
                    borderColor: 'gray',
                    primitive: 'triangle',
                },
            }
        ],
        backgroundColor: '',
        backgroundImage: {
            type: 'imageUrl',
            path: '',
        },
    }
];

const defaultPresentationElements: types.PresentationElements = {
    slidesGroup: presentationSlidesGroup,
    currentSlideIndex: 0,
    selectedSlidesIndexes: [],
    selectedAreasIndexes: [],
    currentAreaIndex: 0,
};

const presentationMaker: types.PresentationMaker = {
    name: '',
    localHistory: [],
    presentationElements: defaultPresentationElements,
    currentPresentationElements: 0,
};

const presentationState = 
{
    curPresentationState: presentationMaker
};

const emptySlide: types.UpdatedSlide = {
    backgroundColor: undefined,
    backgroundImage: undefined,
};

const emptyArea: types.UpdatedArea = {
    id: undefined,
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    zIndex: undefined,
};

const emptyTextInfo: types.UpdatedTextInfo = {
    color: undefined,
    borderColor: undefined,
    fontSize: undefined,
    font: undefined,
    weight: undefined,
    text: undefined
};

const emptyGraphicPrimitiveInfo: types.UpdatedGraphicPrimitiveInfo = {
    color: undefined,
    borderColor: undefined,
    primitive: undefined,
};

const defaultSlideValues: types.Slide = {
    id: 0,
    areas: [],
    backgroundColor: 'white',
    backgroundImage: {type: 'imageUrl', path: ''},
};

const defaultAreaValues: types.Area = {
    id: 0,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    zIndex: 0,
    contains: undefined,
};

const defaultTextInfo: types.TextInfo = {
    type: 'text',
    color: 'black',
    borderColor: 'black',
    fontSize: 80,
    font: 'Arial',
    weight: 40,
    text: '',
};

const defaultGraphicPrimitiveInfo: types.GraphicPrimitiveInfo = {
    type: 'primitive',
    color: 'white',
    borderColor: 'black',
    primitive: 'rectangle',
};

export {
    notSelectedIndex, 
    emptySlide, 
    emptyArea, 
    emptyTextInfo, 
    emptyGraphicPrimitiveInfo, 
    defaultSlideValues,
    defaultAreaValues,
    defaultTextInfo,
    defaultGraphicPrimitiveInfo,
    presentationMaker,
    presentationState
};