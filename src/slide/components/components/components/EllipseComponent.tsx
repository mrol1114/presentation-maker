import React from "react";
import type * as types from '../../../../utils/types';

function EllipseComponent(prop: {graphicPrimitiveElement: types.GraphicPrimitiveInfo, width: number, height: number}): JSX.Element
{
    const style = {

    };

    return (
        <svg width={prop.width} height={prop.height} style={style}>
            <ellipse cx={prop.width/2} cy={prop.height/2} rx={prop.width/2} ry={prop.height/2}/>
        </svg>
    );
}

export default EllipseComponent;