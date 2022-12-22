import React from "react";
import type * as types from "../../../../../common/types";

function RectangleComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo}): JSX.Element
{
    return (
        <svg width="100%" height="100%">
            <rect strokeWidth={prop.graphicPrimitiveElement.strokeWidth} stroke={prop.graphicPrimitiveElement.strokeColor}
            fill={prop.graphicPrimitiveElement.color} width="100%" height="100%"/>
        </svg>
    );
}

export default RectangleComponent;