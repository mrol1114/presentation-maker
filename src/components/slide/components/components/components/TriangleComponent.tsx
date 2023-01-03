import React from "react";
import type * as types from "../../../../../common/types";

function TriangleComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo}): JSX.Element
{
    const strokeWidth: number = Number(prop.graphicPrimitiveElement.strokeWidth);

    const max: number = 100;

    const bottomPoint: number = max - strokeWidth / 2;
    const topPoint: number = strokeWidth * 1.2;
    const bottomLeftPoint: number = strokeWidth * 0.83;
    const bottomRightPoint: number = max - strokeWidth * 0.83;

    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" >
            <polygon strokeWidth={strokeWidth} stroke={prop.graphicPrimitiveElement.strokeColor} 
            fill={prop.graphicPrimitiveElement.color} points={bottomLeftPoint + "," + bottomPoint + " " + 
                max / 2 + "," + topPoint + " " + bottomRightPoint + "," + bottomPoint}/>
        </svg>
    );
}

export default TriangleComponent;