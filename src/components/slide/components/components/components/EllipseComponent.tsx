import React from "react";
import type * as types from "../../../../../common/types";

function EllipseComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo, width: number, height: number}): JSX.Element
{
    const average: number = 50;

    const valueX: number = (average - prop.graphicPrimitiveElement.strokeWidth * average / prop.width) > 0 ? 
        average - prop.graphicPrimitiveElement.strokeWidth * average / prop.width : 1;
    const valueY: number = (average - prop.graphicPrimitiveElement.strokeWidth * average / prop.height) > 0 ?
        average - prop.graphicPrimitiveElement.strokeWidth * average / prop.height : 1;

    return (
        <svg width="100%" height="100%">
            <ellipse fill={prop.graphicPrimitiveElement.color} strokeWidth={valueX === 1 ? "98%" : prop.graphicPrimitiveElement.strokeWidth} 
            stroke={prop.graphicPrimitiveElement.strokeColor} cx="50%" cy="50%" rx={valueX + "%"} ry={valueY + "%"}/>
        </svg>
    );
}

export default EllipseComponent;