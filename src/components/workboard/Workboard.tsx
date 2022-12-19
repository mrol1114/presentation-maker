import React, { useEffect, useState } from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";
import styles from "./styles.module.css";
import areaStyles from "../slide/components/styles.module.css";
import { dispatch } from "../../actions/actions";
import * as functions from "../../common/functions";
import * as consts from "../../common/consts";

function Workboard(props: {presentationElements: types.PresentationElements}): JSX.Element
{
    const workboardSlide = document.getElementById("workboard-slide");
    const workboardSlidePosition = workboardSlide?.getBoundingClientRect();

    const [isControl, setIsControl] = useState(false);

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Control") setIsControl(true);
        };

        function onKeyUp(e) {
            if (e.key === "Control") setIsControl(false);
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        }
    }, []);

    const onMouseDownHandler = (e) => {
        if (!props.presentationElements.slidesGroup.length) return;

        const mousePositionX: number = e.pageX - (workboardSlidePosition ? workboardSlidePosition.x : 0);
        const mousePositionY: number = e.pageY - (workboardSlidePosition ? workboardSlidePosition.y : 0);

        let areaNotSelected: boolean = true;

        props.presentationElements.slidesGroup[props.presentationElements.currentSlideIndex].areas.map((area, index) => {
            const areaElement = document.getElementById(area.id);

            if (mousePositionX >= area.x && mousePositionX <= area.x + area.width &&
                mousePositionY >= area.y && mousePositionY <= area.y + area.height &&
                (index === props.presentationElements.currentAreaIndex || 
                props.presentationElements.selectedAreasIndexes.includes(index)))
            {
                areaNotSelected = false;
            }
            else if (!isControl)
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
        <div onMouseDown={onMouseDownHandler} className={styles["workboard"]}>
            <div id="workboard-slide" className={props.presentationElements.slidesGroup.length ? styles["workboard__slide"] : styles["workboard__without-slide"]}>
                { props.presentationElements.slidesGroup.length !== 0 &&
                    <Slide slideElement={props.presentationElements.slidesGroup[props.presentationElements.currentSlideIndex]} isCurrent={true} isControl={isControl} />
                }
            </div>
        </div>
    );
}

export default Workboard;