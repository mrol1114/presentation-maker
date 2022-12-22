import React from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";
import workboadStyles from "./workboard.module.css";
import areaStyles from "../slide/components/area.module.css";
import { dispatch } from "../../actions/actions";
import * as functions from "../../common/functions";
import * as consts from "../../common/consts";

function Workboard(props: {presentationElements: types.PresentationElements, isControl: boolean}): JSX.Element
{
    const workboardSlide = document.getElementById("workboard-slide");
    const workboardSlidePosition = workboardSlide?.getBoundingClientRect();

    const onMouseDownHandler = (e) => {
        if (!props.presentationElements.slidesGroup.length) return;

        const mousePositionX: number = e.pageX - (workboardSlidePosition ? workboardSlidePosition.x : 0);
        const mousePositionY: number = e.pageY - (workboardSlidePosition ? workboardSlidePosition.y : 0);

        const areaBorderWidth: number = 20;

        let areaNotSelected: boolean = true;

        props.presentationElements.slidesGroup[props.presentationElements.currentSlideIndex].areas.map((area, index) => {
            const areaElement = document.getElementById(area.id);

            if (mousePositionX >= area.x && mousePositionX <= area.x + area.width + areaBorderWidth &&
                mousePositionY >= area.y && mousePositionY <= area.y + area.height + areaBorderWidth &&
                (index === props.presentationElements.currentAreaIndex || 
                props.presentationElements.selectedAreasIndexes.includes(index)))
            {
                areaNotSelected = false;
            }
            else if (!props.isControl)
            {
                areaElement?.classList.remove(areaStyles["area-wrapper-selected"]);
            }
        });

        if (areaNotSelected)
        {
            dispatch(functions.assignAreaIndex, consts.notSelectedIndex);
        }
    };

    return (
        <div onMouseDown={onMouseDownHandler} className={workboadStyles["workboard"]}>
            <div id="workboard-slide" className={props.presentationElements.slidesGroup.length ? workboadStyles["workboard__slide"] : workboadStyles["workboard__without-slide"]}>
                { props.presentationElements.slidesGroup.length !== 0 &&
                    <Slide slideElement={props.presentationElements.slidesGroup[props.presentationElements.currentSlideIndex]} isCurrent={true} isControl={props.isControl} />
                }
            </div>
        </div>
    );
}

export default Workboard;