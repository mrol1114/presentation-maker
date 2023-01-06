import React from "react";
import type * as types from "../../../../../../common/types";
import { connect } from "react-redux";

const connector = connect(null, null);

type Props = {
    graphicPrimitiveElement: types.GraphicPrimitiveInfo,
    width: number,
    height: number,
};

function RectangleComponent(props: Props): JSX.Element
{
    const average: number = 100;

    const width: number = (average - props.graphicPrimitiveElement.strokeWidth * average / props.width) > 0 ? 
        average - props.graphicPrimitiveElement.strokeWidth * average / props.width : 1;
    const height: number = (average - props.graphicPrimitiveElement.strokeWidth * average / props.height) > 0 ?
        average - props.graphicPrimitiveElement.strokeWidth * average / props.height : 1;

    return (
        <svg width="100%" height="100%">
            <rect strokeWidth={props.graphicPrimitiveElement.strokeWidth} stroke={props.graphicPrimitiveElement.strokeColor}
            fill={props.graphicPrimitiveElement.color} width={width + "%"} height={height + "%"}
            x={props.graphicPrimitiveElement.strokeWidth / 2} y={props.graphicPrimitiveElement.strokeWidth / 2} />
        </svg>
    );
}

export default connector(RectangleComponent);