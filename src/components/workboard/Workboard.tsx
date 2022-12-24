import React, { useEffect, useState } from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";
import workboadStyles from "./workboard.module.css";
import { dispatch } from "../../actions/actions";
import areaStyles from "../slide/components/area.module.css";
import * as consts from "../../common/consts";
import * as functions from "../../common/functions";

function Workboard(props: {presentationElements: types.PresentationElements, isControl: boolean}): JSX.Element
{
    const areaBorderWidth: number = 10;
    const slidesGroup: types.Slide[] = props.presentationElements.slidesGroup;
    const currSlideIndex: number = props.presentationElements.currentSlideIndex;
    const currAreaIndex: number = props.presentationElements.currentAreaIndex;

    const [areaSelect, setAreaSelect] = useState(false);

    useEffect(() => {
        if (!areaSelect)
        {
            dispatch(functions.assignAreaIndex, consts.notSelectedIndex);
        }
    }, [areaSelect]);

    const onMouseDownHandler = (e) => {
        if (!slidesGroup.length) return;

        setAreaSelect(false);
        slidesGroup[currSlideIndex].areas.map((area, index) => {
            const areaElements = document.querySelectorAll("#" + area.id);
            const areaWorkboard = areaElements[0];
            const areaSlidesGroup = areaElements[1];

            const areaPosition = areaWorkboard.getBoundingClientRect();
            
            if (e.pageX >= areaPosition.x && e.pageX <= areaPosition.x + area.width + areaBorderWidth * 2 &&
                e.pageY >= areaPosition.y && e.pageY <= areaPosition.y + area.height + areaBorderWidth * 2 &&
                (index === currAreaIndex || props.presentationElements.selectedAreasIndexes.includes(index)))
            {
                setAreaSelect(true);
                areaWorkboard.classList.add(areaStyles["area-wrapper-selected"]);
                areaSlidesGroup.classList.add(areaStyles["area-wrapper-selected"]);
            }
            else if (!props.isControl)
            {
                areaWorkboard.classList.remove(areaStyles["area-wrapper-selected"]);
                areaSlidesGroup.classList.remove(areaStyles["area-wrapper-selected"]);
            }
        });
    };

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