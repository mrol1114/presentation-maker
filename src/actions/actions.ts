import * as types from "../common/types";

let presentationMaker: types.PresentationMaker = {
    name: '',
    localHistory: [],
    presentationElements: {
        slidesGroup: [],
        currentSlideIndex: -1,
        selectedSlidesIndexes: [],
        selectedAreasIndexes: [],
        currentAreaIndex: -1,
    },
    currentPresentationElementsIndex: -1,
};

let onChangeStateHandler: Function = () => {};

function dispatch(handler: Function, payLoad: Object): void
{
    setState(handler(presentationMaker, payLoad));
}

function getState(): types.PresentationMaker
{
    return presentationMaker;
}

function setState(newPresentationMaker: types.PresentationMaker): void
{
    presentationMaker = newPresentationMaker;
    onChangeStateHandler();
}

function addOnChngeStateHandler(handler: Function): void
{
    onChangeStateHandler = handler;
}

export
{
    getState,
    dispatch,
    addOnChngeStateHandler,
}