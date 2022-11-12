import React from "react";
import { presentationState } from "../utils/consts";
import Slide from "../slide/Slide";

function Workboard(): JSX.Element
{
    const currSlideIndex = presentationState.curPresentationState.presentationElements.currentSlideIndex;

    return (
        <div className="workboard">
            <Slide slideIndex={currSlideIndex} />
        </div>
    );
}

export default Workboard;