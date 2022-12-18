import React from "react";
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

    const onMouseHandler = (e) => {
        if (!props.presentationElements.slidesGroup.length) return;

        const mousePositionX: number = e.pageX - (workboardSlidePosition ? workboardSlidePosition.x : 0);
        const mousePositionY: number = e.pageY - (workboardSlidePosition ? workboardSlidePosition.y : 0);

        let areaNotSelected: boolean = true;

        props.presentationElements.slidesGroup[props.presentationElements.currentSlideIndex].areas.map((area, index) => {
            if (mousePositionX >= area.x && mousePositionX <= area.x + area.width &&
                mousePositionY >= area.y && mousePositionY <= area.y + area.height &&
                (index === props.presentationElements.currentAreaIndex || 
                props.presentationElements.selectedAreasIndexes.find(value => value === index)))
            {
                areaNotSelected = false;
                return;
            }

            const areaElement = document.getElementById(area.id);
            areaElement?.classList.remove(areaStyles["area-wrapper-selected"]);
        });

        areaNotSelected ?? dispatch(functions.assignAreaIndex, consts.notSelectedIndex);
    };

    return (
        <div onMouseDown={onMouseHandler} className={styles["workboard"]}>
            <div id="workboard-slide" className={props.presentationElements.slidesGroup.length ? styles["workboard__slide"] : styles["workboard__without-slide"]}>
                { props.presentationElements.slidesGroup.length !== 0 &&
                    <Slide slideElement={props.presentationElements.slidesGroup[props.presentationElements.currentSlideIndex]} isCurrent={true} />
                }
            </div>
        </div>
    );
}

export default Workboard;