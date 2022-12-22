import React, { useEffect, useState } from "react";
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
    const areaBorderWidth: number = 10;

    const currSlideIndex: number = props.presentationElements.currentSlideIndex;
    const currAreaIndex: number = props.presentationElements.currentAreaIndex;
    const slidesGroup: types.Slide[] = props.presentationElements.slidesGroup;

    const [areaSelect, setAreaSelect] = useState(false);

    const onMouseDownHandler = (e) => {
        if (!slidesGroup.length) return;

        const mousePositionX: number = e.pageX - (workboardSlidePosition ? workboardSlidePosition.x : 0);
        const mousePositionY: number = e.pageY - (workboardSlidePosition ? workboardSlidePosition.y : 0);

        setAreaSelect(false);
        slidesGroup[currSlideIndex].areas.map((area, index) => {
            if (mousePositionX >= area.x && mousePositionX <= area.x + area.width + areaBorderWidth * 2 &&
                mousePositionY >= area.y && mousePositionY <= area.y + area.height + areaBorderWidth * 2 &&
                (index === currAreaIndex || props.presentationElements.selectedAreasIndexes.includes(index)))
            {
                setAreaSelect(true);
            }
            else if (!props.isControl)
            {
                const areaElement = document.getElementById(area.id);
                areaElement?.classList.remove(areaStyles["area-wrapper-selected"]);
            }
        });
    };

    useEffect(() => {
        if (!areaSelect)
        {
            dispatch(functions.assignAreaIndex, consts.notSelectedIndex);
        }
    }, [areaSelect]);

    return (
        <div onMouseDown={onMouseDownHandler} className={workboadStyles["workboard"]}>
            <div id="workboard-slide" className={slidesGroup.length ? workboadStyles["workboard__slide"] : workboadStyles["workboard__without-slide"]}>
                { slidesGroup.length !== 0 &&
                    <Slide slideElement={slidesGroup[currSlideIndex]} isCurrent={true} isControl={props.isControl} />
                }
            </div>
        </div>
    );
}

export default Workboard;