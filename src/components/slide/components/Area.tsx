import React, { useEffect } from "react";
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

    const workboardSlide: Element = document.querySelectorAll("#workboard-slide")[0];
    const xDivider: number = workboardSlide && prop.slideRef ? 
        workboardSlide.clientWidth / prop.slideRef.offsetWidth * slideSizeMultiplier : standartDivider;

    const yDivider: number = workboardSlide && prop.slideRef ? 
        workboardSlide.clientHeight / prop.slideRef.offsetHeight * slideSizeMultiplier : standartDivider;

    const style = {
        marginLeft: prop.isCurrentSlide ? prop.areaElement.x : prop.areaElement.x / xDivider,
        marginTop: prop.isCurrentSlide ? prop.areaElement.y : prop.areaElement.y / yDivider,
        width: prop.areaElement.width + areaBorderWidth * 2,
        height: prop.areaElement.height + areaBorderWidth * 2,
    };

    useEffect(() => {
        if (!prop.isCurrentSlide) return;

        const areaElement = document.querySelectorAll("#" + prop.areaElement.id)[0];

        function onMouseDown() {
            prop.isControl ? dispatch(functions.selectAreas, [prop.areaIndex]) : 
                dispatch(functions.assignAreaIndex, prop.areaIndex);
        }

        function onMouseUp() {
            if (!prop.isControl && (areaElement.clientWidth !== prop.areaElement.width || areaElement.clientHeight !== prop.areaElement.height))
            {
                dispatch(functions.updateArea, {width: areaElement.clientWidth, height: areaElement.clientHeight});
            }
        }

        areaElement.addEventListener("mousedown", onMouseDown);
        areaElement.addEventListener("mouseup", onMouseUp);

        return () => {
            areaElement.removeEventListener("mousedown", onMouseDown);
            areaElement.removeEventListener("mouseup", onMouseUp);
        }
    }, [prop.isControl, prop.areaElement]);

    return (
        <div id={prop.areaElement.id} style={style}
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