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
    slideRef: HTMLDivElement|null,
    isControl: boolean
}): JSX.Element
{
    const workboardSlide = document.getElementById("workboard-slide");
    const xDivider: number = workboardSlide && prop.slideRef ? 
        workboardSlide.offsetWidth / prop.slideRef.offsetWidth * 9 : 9;

    const yDivider: number = workboardSlide && prop.slideRef ? 
        workboardSlide.offsetHeight / prop.slideRef.offsetHeight * 9 : 9;

    const areaBorderWidth: number = 10;

    const style = {
        marginLeft: prop.isCurrentSlide ? prop.areaElement.x : prop.areaElement.x / xDivider,
        marginTop: prop.isCurrentSlide ? prop.areaElement.y : prop.areaElement.y / yDivider,
        width: prop.areaElement.width + areaBorderWidth * 2,
        height: prop.areaElement.height + areaBorderWidth * 2,
    };

    useEffect(() => {
        if (!prop.isCurrentSlide) return;

        const areaElement = document.querySelectorAll("#" + prop.areaElement.id)[0];
        const workboardSlidePosition = workboardSlide?.getBoundingClientRect();

        let stepX: number;
        let stepY: number;

        function onDragStart() {
            areaElement.classList.add(styles["dragged"]);
        }

        function onDragEnd(e) {
            const newAreaX: number = e.pageX - (workboardSlidePosition ? workboardSlidePosition.x : 0) - stepX;
            const newAreaY: number = e.pageY - (workboardSlidePosition ? workboardSlidePosition.y : 0) - stepY;

            dispatch(functions.updateArea, {x: newAreaX, y: newAreaY});

            areaElement.classList.remove(styles["dragged"]);
        }

        function onMouseDown(e) {
            const areaPosition = areaElement.getBoundingClientRect();
            
            areaElement?.classList.add(styles["area-wrapper-selected"]);
            prop.isControl ? dispatch(functions.selectAreas, [prop.areaIndex]) : dispatch(functions.assignAreaIndex, prop.areaIndex);

            stepX = e.pageX - areaPosition.x;
            stepY = e.pageY - areaPosition.y;
        }

        function onMouseUp() {
            if (areaElement.clientWidth !== prop.areaElement.width || areaElement.clientHeight !== prop.areaElement.height)
            {
                dispatch(functions.updateArea, {width: areaElement.clientWidth, height: areaElement.clientHeight});
            }
        }

        areaElement.addEventListener("mousedown", onMouseDown);
        areaElement.addEventListener("dragstart", onDragStart);
        areaElement.addEventListener("dragend", onDragEnd);
        areaElement.addEventListener("mouseup", onMouseUp);

        return () => {
            areaElement.removeEventListener("mousedown", onMouseDown);
            areaElement.removeEventListener("dragstart", onDragStart);
            areaElement.removeEventListener("dragend", onDragEnd);
            areaElement.removeEventListener("mouseup", onMouseUp);
        }
    }, [prop.isControl]);

    return (
        <div id={prop.areaElement.id} draggable={true}
        className={prop.isCurrentSlide ? styles["area-wrapper"] : styles["area-wrapper-scale"]} style={style}>
            { prop.areaElement.contains?.type === "text" && 
                <TextComponent textElement={prop.areaElement.contains}/>
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