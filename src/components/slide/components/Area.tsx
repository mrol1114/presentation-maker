import React, { useEffect, useLayoutEffect } from "react";
import GraphicPrimitiveComponent from "./components/GraphicPrimitiveComponent";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import type * as types from "../../../common/types";
import * as functions from "../../../common/functions";
import styles from "./styles.module.css";
import { dispatch, getState } from "../../../actions/actions";
import { useWorkboardSlideRef } from "../../workboard/useWorkboardSlideRef";
import { useSlideRef } from "../useSlideRef";

function Area(prop: {areaElement: types.Area, isCurrentSlide: boolean}): JSX.Element
{
    const workboardSlideRef = useWorkboardSlideRef();
    const slideRef = useSlideRef();

    const xDivider: number = workboardSlideRef.current && slideRef.current ? 
        workboardSlideRef.current.offsetWidth / slideRef.current.offsetWidth + 0.3 : 9;
    const yDivider: number = workboardSlideRef.current && slideRef.current ? 
        workboardSlideRef.current.offsetHeight / slideRef.current.offsetHeight + 0.3 : 9;

    const style = {
        marginLeft: prop.isCurrentSlide ? prop.areaElement.x : prop.areaElement.x / xDivider,
        marginTop: prop.isCurrentSlide ? prop.areaElement.y : prop.areaElement.y / yDivider,
        width: prop.areaElement.width + 10,
        height: prop.areaElement.height + 10,
    };

    const presElements: types.PresentationElements = getState().presentationElements;
    const areaIndex: number = presElements.slidesGroup[presElements.currentSlideIndex].areas.findIndex(area => area.id === prop.areaElement.id);

    const workboardPositionX: number = 420;
    const workboardPositionY: number = 166;

    let coordX: number;
    let coordY: number;
    const mousePositionHandler = e => {
        coordX = e.pageX - workboardPositionX;
        coordY = e.pageY - workboardPositionY;
    }

    useEffect(() => {
        function onDragStart() {

        }

        document.addEventListener('dragstart', onDragStart)

        return () => {
            document.removeEventListener('dragstart', onDragStart)
        }
    }, [])

    const onMouseDownHandler = () =>
    {
        const areaElement = document.querySelectorAll("#" + prop.areaElement.id)[1];

        let stepX: number;
        let stepY: number;

        dispatch(functions.assignAreaIndex, areaIndex);

        document.addEventListener("dragover", mousePositionHandler);

        document.addEventListener("mousedown", function mouseHandler(e) {
            stepX = e.pageX - workboardPositionX - prop.areaElement.x;
            stepY = e.pageY - workboardPositionY - prop.areaElement.y;

            areaElement.classList.add(styles["area-wrapper-selected"]);

            document.removeEventListener("mousedown", mouseHandler);
        });

        areaElement?.addEventListener("dragstart", function dragStartHandler() {
            areaElement.classList.add(styles["selected"]);
            areaElement.removeEventListener("dragend", dragStartHandler);
        });

        areaElement?.addEventListener("dragend", function dragEndHandler() {
            areaElement.classList.remove(styles["selected"]);

            dispatch(functions.updateArea, {x: coordX - stepX, y: coordY - stepY});

            areaElement.removeEventListener("dragend", dragEndHandler);
            document.removeEventListener("dragover", mousePositionHandler);
        });
    }

    return (
        <div id={prop.areaElement.id} draggable={prop.isCurrentSlide ? true : false} className={prop.isCurrentSlide ? styles["area-wrapper"] : styles["area-wrapper-scale"]} 
        onMouseDown={onMouseDownHandler} style={style}>
            { prop.areaElement.contains?.type === "text" && 
                <TextComponent textElement={prop.areaElement.contains} id={prop.areaElement.id}/>
            }

            { prop.areaElement.contains?.type === "primitive" && 
                <GraphicPrimitiveComponent areaElement={prop.areaElement}/>
            }

            { (prop.areaElement.contains?.type === "imageUrl" || prop.areaElement.contains?.type === "imageBase64") && 
                <ImageComponent imageElement={prop.areaElement.contains}/>
            }
        </div>
    );
}

export default Area;