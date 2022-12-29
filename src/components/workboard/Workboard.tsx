import React, { useEffect, useState } from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";
import workboadStyles from "./workboard.module.css";
import { dispatch, getState, setState } from "../../actions/actions";
import areaStyles from "../slide/components/area.module.css";
import * as consts from "../../common/consts";
import * as functions from "../../common/functions";

function Workboard(props: { presentationElements: types.PresentationElements, isControl: boolean }): JSX.Element {
    const areaBorderWidth: number = 10;
    const resizeRightIndent: number = 25;
    const resizeTopIndent: number = 11;
    const resizeLeftIndent: number = 11;
    const resizeBottomIndent: number = 25;

    const slidesGroup: types.Slide[] = props.presentationElements.slidesGroup;
    const currSlideIndex: number = props.presentationElements.currentSlideIndex;
    const currAreaIndex: number = props.presentationElements.currentAreaIndex;

    const [areasSelect, setAreasSelect] = useState(Array<types.AreaSelect>);
    const [isDrag, setIsDrag] = useState(false);
    const [isMove, setIsMove] = useState(false);

    const saveAreasCoords = (e) => {
        if (!slidesGroup.length) return;

        let areasInfo: Array<{ index: number, x: number, y: number, stepX: number, stepY: number }> = [];

        slidesGroup[currSlideIndex].areas.map((area, index) => {
            const areaWorkboard = document.querySelectorAll("#" + area.id)[0];
            const areaPosition = areaWorkboard.getBoundingClientRect();

            if (index === currAreaIndex || props.presentationElements.selectedAreasIndexes.includes(index)) {
                const areaInfo: types.AreaSelect = {
                    index: index,
                    x: areaPosition.x,
                    y: areaPosition.y,
                    stepX: e.pageX - areaPosition.x,
                    stepY: e.pageY - areaPosition.y,
                }

                areasInfo = (index === currAreaIndex) ? [areaInfo] : 
                    [...areasInfo.filter(value => value.index !== index), areaInfo];
            }
        });

        setAreasSelect(areasInfo);
    }

    const updateAreasSelect = () => {
        if (!slidesGroup[currSlideIndex] || !slidesGroup[currSlideIndex].areas) return;

        slidesGroup[currSlideIndex].areas.map((area, index) => {
            const areaElements = document.querySelectorAll("#" + area.id);
            const areaWorkboard = areaElements[0];
            const areaSlidesGroup = areaElements[1];

            if (index === currAreaIndex || props.presentationElements.selectedAreasIndexes.includes(index)) {
                areaWorkboard.classList.add(areaStyles["area-wrapper-selected"]);
                areaSlidesGroup.classList.add(areaStyles["area-wrapper-selected"]);
            }
            else {
                areaWorkboard.classList.remove(areaStyles["area-wrapper-selected"]);
                areaSlidesGroup.classList.remove(areaStyles["area-wrapper-selected"]);
            }
        });
    }

    useEffect(() => {
        const presMaker: types.PresentationMaker = getState();
        const workboard = document.querySelectorAll("#workboard")[0];
        const workboardSlide: Element = document.querySelectorAll("#workboard-slide")[0];
        const workboardSlidePosition = workboardSlide.getBoundingClientRect();

        function onMouseMove(e) {
            const lastAreaIndex: number = areasSelect[areasSelect.length - 1].index;

            const newCoordX: number = e.pageX - workboardSlidePosition.x - areasSelect[areasSelect.length - 1].stepX;
            const newCoordY: number = e.pageY - workboardSlidePosition.y - areasSelect[areasSelect.length - 1].stepY;

            const stepX: number = newCoordX - presMaker.presentationElements.slidesGroup[currSlideIndex].areas[lastAreaIndex].x;
            const stepY: number = newCoordY - presMaker.presentationElements.slidesGroup[currSlideIndex].areas[lastAreaIndex].y;

            presMaker.presentationElements.slidesGroup[currSlideIndex].areas[lastAreaIndex].x = newCoordX;
            presMaker.presentationElements.slidesGroup[currSlideIndex].areas[lastAreaIndex].y = newCoordY;

            presMaker.presentationElements.slidesGroup[currSlideIndex].areas.map((area, index) => {
                if (!areasSelect.find(value => value.index === index) || index === lastAreaIndex) return;

                area.x += stepX;
                area.y += stepY;
            });

            setIsMove(true);
            setState(presMaker);
        }

        function onMouseUp() {
            setIsDrag(false);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            if (!isMove) return;

            let updatedAreas: types.UpdatedArea[] = [];

            presMaker.presentationElements.slidesGroup[currSlideIndex].areas.map((area, index) => {
                const areaSelect = areasSelect.find(value => value.index === index);

                if (!areaSelect) return;

                const updatedArea: types.UpdatedArea = {
                    index: index,
                    x: area.x,
                    y: area.y
                };

                updatedAreas = [...updatedAreas, updatedArea];

                area.x = areaSelect.x - workboardSlidePosition.x;
                area.y = areaSelect.y - workboardSlidePosition.y;
            });

            dispatch(functions.updateAreas, updatedAreas);
        }

        function onMouseDown(e) {
            if (!slidesGroup.length) return;

            let isSelect: boolean = false;
            let isResize: boolean = false;
            slidesGroup[currSlideIndex].areas.map((area, index) => {
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
                else if (cursorInArea && (index === currAreaIndex || props.presentationElements.selectedAreasIndexes.includes(index))) {
                    isSelect = true;
                }
            });

            if (isSelect) {
                setIsMove(false);
                setIsDrag(true);

                saveAreasCoords(e);
            }
            else if (!props.isControl && !isResize) {
                setAreasSelect([]);
                dispatch(functions.assignAreaIndex, consts.notSelectedIndex);
            }
        };

        updateAreasSelect();
        workboard.addEventListener("mousedown", onMouseDown);
        if (isDrag) {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }

        return () => {
            workboard.removeEventListener("mousedown", onMouseDown);
        }
    }, [areasSelect, isDrag, isMove, props.presentationElements, props.isControl]);

    return (
        <div id="workboard" className={workboadStyles["workboard"]}>
            <div id="workboard-slide" className={slidesGroup.length ? workboadStyles["workboard__slide"] : workboadStyles["workboard__without-slide"]}>
                {slidesGroup.length !== 0 &&
                    <Slide slideElement={slidesGroup[currSlideIndex]} index={currSlideIndex} isCurrent={true} isControl={props.isControl} />
                }
            </div>
        </div>
    );
}

export default Workboard;