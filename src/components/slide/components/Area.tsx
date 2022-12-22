import React, { useEffect, useState } from "react";
import GraphicPrimitiveComponent from "./components/GraphicPrimitiveComponent";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import type * as types from "../../../common/types";
import * as functions from "../../../common/functions";
import areaStyles from "./area.module.css";
import { dispatch } from "../../../actions/actions";

function Area(prop: {
    areaElement: types.Area, 
    areaIndex: number,
    isCurrentSlide: boolean,
    slideRef: HTMLDivElement|null,
    isControl: boolean
}): JSX.Element
{
    const areaBorderWidth: number = 10;
    const standartDivider: number = 9;
    const slideSizeMultiplier: number = 9;

    const workboardSlide = document.getElementById("workboard-slide");
    const xDivider: number = workboardSlide && prop.slideRef ? 
        workboardSlide.offsetWidth / prop.slideRef.offsetWidth * slideSizeMultiplier : standartDivider;

    const yDivider: number = workboardSlide && prop.slideRef ? 
        workboardSlide.offsetHeight / prop.slideRef.offsetHeight * slideSizeMultiplier : standartDivider;

    const style = {
        marginLeft: prop.isCurrentSlide ? prop.areaElement.x : prop.areaElement.x / xDivider,
        marginTop: prop.isCurrentSlide ? prop.areaElement.y : prop.areaElement.y / yDivider,
        width: prop.areaElement.width + areaBorderWidth * 2,
        height: prop.areaElement.height + areaBorderWidth * 2,
    };

    const [stepX, setStepX] = useState(0);
    const [stepY, setStepY] = useState(0);

    useEffect(() => {
        if (!prop.isCurrentSlide) return;

        const areaElement = document.querySelectorAll("#" + prop.areaElement.id)[0];
        const workboardSlidePosition = workboardSlide?.getBoundingClientRect();

        function onDragStart() {
            areaElement.classList.add(areaStyles["dragged"]);
        }

        function onDragEnd(e) {
            const newAreaX: number = e.pageX - (workboardSlidePosition ? workboardSlidePosition.x : 0) - stepX;
            const newAreaY: number = e.pageY - (workboardSlidePosition ? workboardSlidePosition.y : 0) - stepY;

            dispatch(functions.updateArea, {x: newAreaX, y: newAreaY});

            areaElement.classList.remove(areaStyles["dragged"]);
        }

        function onMouseDown(e) {
            const areaPosition = areaElement.getBoundingClientRect();
            
            areaElement?.classList.add(areaStyles["area-wrapper-selected"]);
            prop.isControl ? dispatch(functions.selectAreas, [prop.areaIndex]) : dispatch(functions.assignAreaIndex, prop.areaIndex);

            setStepX(e.pageX - areaPosition.x);
            setStepY(e.pageY - areaPosition.y);
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
    }, [prop.isControl, stepX, stepY]);

    return (
        <div id={prop.areaElement.id} draggable={true} style={style}
        className={prop.isCurrentSlide ? areaStyles["area-wrapper"] : areaStyles["area-wrapper-scale"]}>
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