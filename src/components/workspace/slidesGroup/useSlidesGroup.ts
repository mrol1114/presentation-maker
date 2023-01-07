import React, { useEffect, useState } from "react";
import slidesGroupStyles from "./slidesGroup.module.css";
import * as slideActions from "../../../actions/slides/slidesActions";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "../../../store";

const mapState = (state: RootState) => ({
    currSlideIndex: state.presentationElements.currentSlideIndex,
    slidesGroup: state.presentationElements.slidesGroup,
    selectedSlidesIndexes: state.presentationElements.selectedSlidesIndexes,
});

const mapDispatch = {
    moveSlides: slideActions.moveSlides,
    assignSlideIndex: slideActions.assignSlideIndex,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    isControl: boolean,
};

function useSlidesGroup(props: Props)
{
    const slideWidth: number = 219;
    const slideHeight: number = 125;
    const slideDistance: number = 20;

    const [isDrag, setIsDrag] = useState(false);
    const [isMove, setIsMove] = useState(false);

    const updateSlidesSelect = () => {
        if (!props.slidesGroup[props.currSlideIndex] || !props.slidesGroup[props.currSlideIndex].areas) return;

        props.slidesGroup.map((slide, index) => {
            const slideElement = document.querySelectorAll("#" + slide.id)[0];

            if (index === props.currSlideIndex || props.selectedSlidesIndexes.includes(index)) 
            {
                slideElement.classList.add(slidesGroupStyles["slide-wrapper-selected"]);
            }
            else 
            {
                slideElement.classList.remove(slidesGroupStyles["slide-wrapper-selected"]);
            }
        });
    }

    useEffect(() => {
        const slidesGroupElement = document.querySelectorAll("#slides-group")[0];

        function onMouseMove() {
            setIsMove(true);
        }

        function onMouseUp(e) {
            setIsDrag(false);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            slidesGroupElement.classList.remove(slidesGroupStyles["slides-group-active"]);

            let insertPos: number = -1;

            props.slidesGroup.map((slide, index) => {
                const slideElement = document.querySelectorAll("#" + slide.id)[0];
                const slidePosition = slideElement.getBoundingClientRect();

                const cursorPosDownY: number = e.pageY - slidePosition.y - slidePosition.height;

                const cursorPosDown: boolean = cursorPosDownY > 0 && 
                    (cursorPosDownY <= slideDistance || index === props.slidesGroup.length - 1);
                const cursorPosUp: boolean = slidePosition.y - e.pageY <= slideDistance;

                if (cursorPosDown)
                {
                    insertPos = index + 1;
                }
                else if (cursorPosUp)
                {
                    insertPos = index;
                }
            });

            if (isMove)
            {
                props.moveSlides(insertPos);
            }
        }

        function onMouseDown(e) {
            let isSelect: boolean = false;

            props.slidesGroup.map((slide, index) => {
                const slideElement = document.querySelectorAll("#" + slide.id)[0];
                const slidePosition = slideElement.getBoundingClientRect();

                const cursorInSlide: boolean = e.pageX >= slidePosition.x && e.pageY >= slidePosition.y &&
                    e.pageX <= slidePosition.x + slideWidth && e.pageY <= slidePosition.y + slideHeight;

                if (cursorInSlide && (index === props.currSlideIndex || props.selectedSlidesIndexes.includes(index)))
                {
                    isSelect = true;
                }
            });

            if (isSelect)
            {
                setIsMove(false);
                setIsDrag(true);
                slidesGroupElement.classList.add(slidesGroupStyles["slides-group-active"]);
            }
            else if (!props.isControl)
            {
                props.assignSlideIndex(props.slidesGroup.length - 1);
            }
        };

        updateSlidesSelect();
        slidesGroupElement.addEventListener("mousedown", onMouseDown);
        if (isDrag) 
        {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }

        return () => {
            slidesGroupElement.removeEventListener("mousedown", onMouseDown);
        };
    });
}

export default useSlidesGroup;