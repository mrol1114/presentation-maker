import React from "react";
import Slide from "../slide/Slide";
import type * as types from "../../common/types";

function SlidesGroup(props: {slideElements: types.Slide[]}): JSX.Element
{
    const slideComponents = props.slideElements.map((slideElement: types.Slide) => {
        return (
            <li key={slideElement.id}>
                <Slide slideElement={slideElement} />
            </li>
        );
    });

    return (
        <ul className="slides-group">
            {slideComponents}
        </ul>
    );
}

export default SlidesGroup;