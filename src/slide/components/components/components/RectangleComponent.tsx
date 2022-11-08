import React from "react";
import type * as types from '../../../../utils/types';

function RectangleComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo, width: number, height: number}): JSX.Element
{
    const style = {
        
    };

    return (
        <svg style={style}>
            <rect width={prop.width} height={prop.height}/>
        </svg>
    );
}

export default RectangleComponent;