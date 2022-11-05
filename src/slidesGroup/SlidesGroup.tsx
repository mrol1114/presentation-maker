import React from "react";
import { presentationMaker } from "../utils/consts";
import Slide from "../slide/Slide";
import type * as types from "../utils/types";

function SlidesGroup(): JSX.Element
{
    const slideElements = presentationMaker.presentationElements.slidesGroup;
    const slideComponents = slideElements.map((slideElement: types.Slide, index) => {
        return (
            <Slide slideIndex={index} key={slideElement.id}/>
        );
    });

    return (
        <div className="slides-group">
            {slideComponents}
        </div>
    );
}

export default SlidesGroup;