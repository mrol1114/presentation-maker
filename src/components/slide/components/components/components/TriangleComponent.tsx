import React from "react";
import type * as types from "../../../../../common/types";

function TriangleComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo, width: number, height: number}): JSX.Element
{
    const style = {

    };

    return (
        <svg width={prop.width} height={prop.height} style={style}>
            <polyline points={"0 " + String(prop.height) + " " + String(prop.width/2) + " 0 " + String(prop.width) + " " + String(prop.height)}/>
        </svg>
    );
}

export default TriangleComponent;