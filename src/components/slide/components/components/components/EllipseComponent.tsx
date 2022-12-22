import React from "react";
import type * as types from "../../../../../common/types";

function EllipseComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo}): JSX.Element
{
    return (
        <svg width="100%" height="100%">
            <ellipse fill={prop.graphicPrimitiveElement.color} strokeWidth={prop.graphicPrimitiveElement.strokeWidth} 
            stroke={prop.graphicPrimitiveElement.strokeColor} cx="50%" cy="50%" rx="50%" ry="50%"/>
        </svg>
    );
}

export default EllipseComponent;