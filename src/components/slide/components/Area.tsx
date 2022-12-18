import React, { useEffect } from "react";
import GraphicPrimitiveComponent from "./components/GraphicPrimitiveComponent";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import type * as types from "../../../common/types";
import * as functions from "../../../common/functions";
import styles from "./styles.module.css";
import { dispatch } from "../../../actions/actions";

function Area(prop: {
    areaElement: types.Area, 
    areaIndex: number,
    isCurrentSlide: boolean,
    slideRef: HTMLDivElement|null
}): JSX.Element
{
    const workboardSlide = document.getElementById("workboard-slide");
    const xDivider: number = workboardSlide && prop.slideRef ? 
        workboardSlide.offsetWidth / prop.slideRef.offsetWidth * 9 : 9;

    const yDivider: number = workboardSlide && prop.slideRef ? 
        workboardSlide.offsetHeight / prop.slideRef.offsetHeight * 9 : 9;

    const style = {
        marginLeft: prop.isCurrentSlide ? prop.areaElement.x : prop.areaElement.x / xDivider,
        marginTop: prop.isCurrentSlide ? prop.areaElement.y : prop.areaElement.y / yDivider,
        width: prop.areaElement.width + 10,
        height: prop.areaElement.height + 10,
    };

    useEffect(() => {
        if (!prop.isCurrentSlide) return;

        const areaElement = document.querySelectorAll("#" + prop.areaElement.id)[0];

        let stepX: number;
        let stepY: number;

        function onDragStart() {
            areaElement.classList.add(styles["dragged"]);
        }

        function onDragEnd(e) {
            const workboardSlidePosition = workboardSlide?.getBoundingClientRect();

            const newAreaX: number = e.pageX - (workboardSlidePosition ? workboardSlidePosition.x : 0) - stepX;
            const newAreaY: number = e.pageY - (workboardSlidePosition ? workboardSlidePosition.y : 0) - stepY;

            dispatch(functions.updateArea, {x: newAreaX, y: newAreaY});

            areaElement.classList.remove(styles["dragged"]);
        }

        function onMouseDown(e) {
            areaElement?.classList.add(styles["area-wrapper-selected"]);
            dispatch(functions.assignAreaIndex, prop.areaIndex);

            const areaPosition = areaElement.getBoundingClientRect();
            stepX = e.pageX - areaPosition.x;
            stepY = e.pageY - areaPosition.y;
        }

        areaElement.addEventListener("mousedown", onMouseDown);
        areaElement.addEventListener("dragstart", onDragStart);
        areaElement.addEventListener("dragend", onDragEnd);

        return () => {
            areaElement.removeEventListener("mousedown", onMouseDown);
            areaElement.removeEventListener("dragstart", onDragStart);
            areaElement.removeEventListener("dragend", onDragEnd);
        }
    }, []);

    return (
        <div id={prop.areaElement.id} draggable={prop.isCurrentSlide ? true : false} 
        className={prop.isCurrentSlide ? styles["area-wrapper"] : styles["area-wrapper-scale"]} style={style}>
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