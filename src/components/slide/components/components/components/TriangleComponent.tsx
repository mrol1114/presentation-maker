import React from "react";
import type * as types from "../../../../../common/types";

function TriangleComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo}): JSX.Element
{
    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" >
            <polygon strokeWidth={prop.graphicPrimitiveElement.strokeWidth} stroke={prop.graphicPrimitiveElement.strokeColor} 
            fill={prop.graphicPrimitiveElement.color} points="0,100 50,0 100,100"/>
        </svg>
    );
}

export default TriangleComponent;