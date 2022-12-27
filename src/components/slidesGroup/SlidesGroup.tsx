import React, { useEffect, useState } from "react";
import Slide from "../slide/Slide";
import type * as types from "../../common/types";
import slidesGroupStyles from "./slidesGroup.module.css";
import { dispatch } from "../../actions/actions";
import * as consts from "../../common/consts";
import * as functions from "../../common/functions";

function SlidesGroup(props: {presentationElements: types.PresentationElements, isControl: boolean}): JSX.Element
{
    const slideWidth: number = 219;
    const slideHeight: number = 125;
    const currSlideIndex: number = props.presentationElements.currentSlideIndex;
    const slidesGroup = props.presentationElements.slidesGroup;

    const [isDrag, setIsDrag] = useState(false);
    const [isMove, setIsMove] = useState(false);

    const updateSlidesSelect = () => {
        if (!slidesGroup[currSlideIndex] || !slidesGroup[currSlideIndex].areas) return;

        slidesGroup.map((slide, index) => {
            const slideElement = document.querySelectorAll("#" + slide.id)[0];

            if (index === currSlideIndex || props.presentationElements.selectedSlidesIndexes.includes(index)) {
                slideElement.classList.add(slidesGroupStyles["slide-wrapper-selected"]);
            }
            else {
                slideElement.classList.remove(slidesGroupStyles["slide-wrapper-selected"]);
            }
        });
    }

    useEffect(() => {
        const slidesGroupElement = document.querySelectorAll("#slides-group")[0];

        function onMouseMove(e) {
            /* Code */
            
            setIsMove(true);
        }

        function onMouseUp() {
            setIsDrag(false);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            /* Code */
        }

        function onMouseDown(e) {
            let isSelect: boolean = false;

            props.presentationElements.slidesGroup.map((slide, index) => {
                const slideElement = document.querySelectorAll("#" + slide.id)[0];
                const slidePosition = slideElement.getBoundingClientRect();

                const cursorInSlide: boolean = e.pageX >= slidePosition.x && e.pageY >= slidePosition.y &&
                    e.pageX <= slidePosition.x + slideWidth && e.pageY <= slidePosition.y + slideHeight;

                if (cursorInSlide && (index === currSlideIndex || props.presentationElements.selectedSlidesIndexes.includes(index)))
                {
                    isSelect = true;
                }
            });

            if (isSelect)
            {
                setIsMove(false);
                setIsDrag(true);
            }
            else if (!props.isControl)
            {
                dispatch(functions.assignSlideIndex, slidesGroup.length - 1);
            }
        };

        updateSlidesSelect();
        slidesGroupElement.addEventListener("mousedown", onMouseDown);
        if (isDrag) {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }

        return () => {
            slidesGroupElement.removeEventListener("mousedown", onMouseDown);
        };
    });

    const slideComponents = props.presentationElements.slidesGroup.map((slideElement, index) => {
        return (
            <li key={slideElement.id} id={slideElement.id} className={currSlideIndex === index ? 
            slidesGroupStyles["slide-wrapper-current"] : slidesGroupStyles["slide-wrapper"]}>
                <Slide slideElement={slideElement} index={index} isCurrent={false} isControl={props.isControl} />
            </li>
        );
    });

    return (
        <ol id="slides-group" className={slidesGroupStyles["slides-group"]}>
            {slideComponents}
        </ol>
    );
}

export default SlidesGroup;