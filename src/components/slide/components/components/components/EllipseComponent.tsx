import React from "react";
import type * as types from "../../../../../common/types";
import { connect } from "react-redux";

const connector = connect(null, null);

type Props = {
    graphicPrimitiveElement: types.GraphicPrimitiveInfo,
    width: number,
    height: number,
};

function EllipseComponent(props: Props): JSX.Element
{
    const average: number = 50;

    const valueX: number = (average - props.graphicPrimitiveElement.strokeWidth * average / props.width) > 0 ? 
        average - props.graphicPrimitiveElement.strokeWidth * average / props.width : 1;
    const valueY: number = (average - props.graphicPrimitiveElement.strokeWidth * average / props.height) > 0 ?
        average - props.graphicPrimitiveElement.strokeWidth * average / props.height : 1;

    return (
        <svg width="100%" height="100%">
            <ellipse fill={props.graphicPrimitiveElement.color} strokeWidth={valueX === 1 ? "98%" : props.graphicPrimitiveElement.strokeWidth} 
            stroke={props.graphicPrimitiveElement.strokeColor} cx="50%" cy="50%" rx={valueX + "%"} ry={valueY + "%"}/>
        </svg>
    );
}

export default connector(EllipseComponent);