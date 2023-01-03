import React from "react";
import type * as types from "../../../../../common/types";

function RectangleComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo, width: number, height: number}): JSX.Element
{
    const average: number = 100;

    const width: number = (average - prop.graphicPrimitiveElement.strokeWidth * average / prop.width) > 0 ? 
        average - prop.graphicPrimitiveElement.strokeWidth * average / prop.width : 1;
    const height: number = (average - prop.graphicPrimitiveElement.strokeWidth * average / prop.height) > 0 ?
        average - prop.graphicPrimitiveElement.strokeWidth * average / prop.height : 1;

    return (
        <svg width="100%" height="100%">
            <rect strokeWidth={prop.graphicPrimitiveElement.strokeWidth} stroke={prop.graphicPrimitiveElement.strokeColor}
            fill={prop.graphicPrimitiveElement.color} width={width + "%"} height={height + "%"}
            x={prop.graphicPrimitiveElement.strokeWidth / 2} y={prop.graphicPrimitiveElement.strokeWidth / 2} />
        </svg>
    );
}

export default RectangleComponent;