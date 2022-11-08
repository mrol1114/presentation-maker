import React from "react";
import { presentationMaker } from "../utils/consts";
import Slide from "../slide/Slide";

function Workboard(): JSX.Element
{
    const currSlideIndex = presentationMaker.presentationElements.currentSlideIndex;

    return (
        <div className="workboard">
            <Slide slideIndex={currSlideIndex}/>
        </div>
    );
}

export default Workboard;