import React, { useEffect, useState } from "react";
import * as types from "../../../common/types";
import areaStyles from "../../slide/components/area.module.css";
import * as consts from "../../../common/consts";
import * as areaActions from "../../../actions/areas/areasActions";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "../../../store";

const mapState = (state: RootState) => ({
    slidesGroup: state.presentationElements.slidesGroup,
    currSlideIndex: state.presentationElements.currentSlideIndex,
    currAreaIndex: state.presentationElements.currentAreaIndex,
    selectedAreasIndexes: state.presentationElements.selectedAreasIndexes,
    presentationElements: state.presentationElements,
});

const mapDispatch = {
    updateInDragAreas: areaActions.updateInDragAreas,
    updateAreas: areaActions.updateAreas,
    assignAreaIndex: areaActions.assignAreaIndex,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    isControl: boolean,
};

function useWorkboard(props: Props) 
{
    const resizeDivider: number = 1.778;
    const distanceFromEdgeOfWorkboardToSlide: number = 150;

    const areaBorderWidth: number = 10;
    const resizeRightIndent: number = 25;
    const resizeTopIndent: number = 11;
    const resizeLeftIndent: number = 11;
    const resizeBottomIndent: number = 25;

    const [areasSelect, setAreasSelect] = useState(Array<types.AreaSelect>);
    const [isDrag, setIsDrag] = useState(false);
    const [isMove, setIsMove] = useState(false);

    const saveAreasCoords = (e) => {
        if (!props.slidesGroup.length) return;

        let areasInfo: Array<{ index: number, x: number, y: number, stepX: number, stepY: number }> = [];

        props.slidesGroup[props.currSlideIndex].areas.map((area, index) => {
            const areaWorkboard = document.querySelectorAll("#" + area.id)[0];
            const areaPosition = areaWorkboard.getBoundingClientRect();

            if (index === props.currAreaIndex || props.selectedAreasIndexes.includes(index)) {
                const areaInfo: types.AreaSelect = {
                    index: index,
                    x: areaPosition.x,
                    y: areaPosition.y,
                    stepX: e.pageX - areaPosition.x,
                    stepY: e.pageY - areaPosition.y,
                }

                areasInfo = (index === props.currAreaIndex) ? [areaInfo] : 
                    [...areasInfo.filter(value => value.index !== index), areaInfo];
            }
        });

        setAreasSelect(areasInfo);
    }

    const updateAreasSelect = () => {
        if (!props.slidesGroup[props.currSlideIndex] || !props.slidesGroup[props.currSlideIndex].areas) return;

        props.slidesGroup[props.currSlideIndex].areas.map((area, index) => {
            const areaElements = document.querySelectorAll("#" + area.id);
            const areaWorkboard = areaElements[0];
            const areaSlidesGroup = areaElements[1];

            if (index === props.currAreaIndex || props.selectedAreasIndexes.includes(index)) {
                areaWorkboard.classList.add(areaStyles["area-wrapper-selected"]);
                areaSlidesGroup.classList.add(areaStyles["area-wrapper-selected"]);
            }
            else {
                areaWorkboard.classList.remove(areaStyles["area-wrapper-selected"]);
                areaSlidesGroup.classList.remove(areaStyles["area-wrapper-selected"]);
            }
        });
    }

    const updateWorkboardSize = () => {
        const workboard = document.querySelectorAll("#workboard")[0];
        const workboardSlide: Element = document.querySelectorAll("#workboard-slide")[0];

        const workboardSlideStyles = (workboardSlide as HTMLElement).style;

        if (workboardSlide.clientWidth / resizeDivider < workboard.clientHeight - distanceFromEdgeOfWorkboardToSlide)
        {
            workboardSlideStyles.width = "100%";
            workboardSlideStyles.height = (workboardSlide.clientWidth / resizeDivider).toString() + "px";
        }
        else
        {
            workboardSlideStyles.height = "100%";
            workboardSlideStyles.width = (workboardSlide.clientHeight * resizeDivider).toString() + "px";
        }
    }

    useEffect(() => {
        const workboard = document.querySelectorAll("#workboard")[0];
        const workboardSlide: Element = document.querySelectorAll("#workboard-slide")[0];
        const workboardSlidePosition = workboardSlide.getBoundingClientRect();

        function onMouseMove(e) {
            const newCoordX: number = e.pageX - workboardSlidePosition.x - areasSelect[areasSelect.length - 1].stepX;
            const newCoordY: number = e.pageY - workboardSlidePosition.y - areasSelect[areasSelect.length - 1].stepY;

            props.updateInDragAreas({areasSelect: [...areasSelect], newAreaLastX: newCoordX, newAreaLastY: newCoordY});

            setIsMove(true);
        }

        function onMouseUp() {
            setIsDrag(false);

            if (!isMove) return;

            props.updateAreas({
                areasSelect: areasSelect, slidePosX: workboardSlidePosition.x, slidePosY: workboardSlidePosition.y
            });
            setIsMove(false);
        }

        function onMouseDown(e) {
            if (!props.slidesGroup.length) return;

            let isSelect: boolean = false;
            let isResize: boolean = false;
            props.slidesGroup[props.currSlideIndex].areas.map((area, index) => {
                const areaWorkboard = document.querySelectorAll("#" + area.id)[0];
                const areaPosition = areaWorkboard.getBoundingClientRect();

                const cursorInArea: boolean = e.pageX >= areaPosition.x && e.pageY >= areaPosition.y &&
                    e.pageX <= areaPosition.x + area.width + areaBorderWidth * 2 && 
                    e.pageY <= areaPosition.y + area.height + areaBorderWidth * 2;
                
                const cursorInResize: boolean = e.pageX >= areaPosition.x + areaPosition.width - resizeRightIndent && 
                    e.pageY >= areaPosition.y + areaPosition.height - resizeBottomIndent &&
                    e.pageX <= areaPosition.x + areaPosition.width - resizeLeftIndent && 
                    e.pageY <= areaPosition.y + areaPosition.height - resizeTopIndent;

                if (cursorInResize && !props.isControl)
                {
                    isSelect = false;
                    isResize = true;
                }
                else if (cursorInArea && (index === props.currAreaIndex || props.selectedAreasIndexes.includes(index))) {
                    isSelect = true;
                }
            });

            if (isSelect) {
                saveAreasCoords(e);
                setIsDrag(true);
            }
            else if (!props.isControl && !isResize) {
                setAreasSelect([]);
                props.assignAreaIndex(consts.notSelectedIndex);
            }
        };

        updateWorkboardSize();

        window.onresize = () => {
            updateWorkboardSize();
        }

        updateAreasSelect();

        workboard.addEventListener("mousedown", onMouseDown);
        if (isDrag)
        {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }

        return () => {
            workboard.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
    }, [areasSelect, isDrag, props.presentationElements, props.isControl]);
}

export default useWorkboard;