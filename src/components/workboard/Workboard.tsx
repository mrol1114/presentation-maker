import React from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";


function Workboard(props: {slideElements: types.Slide[], currentSlideIndex: number}): JSX.Element
{
    if (props.slideElements.length == 0)
    {
        return (<></>);
    }

    return (
        <div className="workboard">
            <Slide slideElement={props.slideElements[props.currentSlideIndex]} />
        </div>
    );
}

export default Workboard;