import React from "react";
import type * as types from "../../../../../common/types";

function RectangleComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo, width: number, height: number}): JSX.Element
{
    const style = {
        
    };

    return (
        <svg width={prop.width} height={prop.height} style={style}>
            <rect width={prop.width} height={prop.height}/>
        </svg>
    );
}

export default RectangleComponent;