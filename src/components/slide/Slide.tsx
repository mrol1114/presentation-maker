import React from "react";
import Area from "./components/Area";
import type * as types from "../../common/types";
import slideStyles from "./slide.module.css"

function Slide(props: {slideElement: types.Slide, isCurrent: boolean}): JSX.Element
{
    const areaElements = props.slideElement.areas;
    const areaComponents = areaElements.map((area: types.Area) => {
        return (
            <Area areaElement={area} key={area.id} isCurrentSlide={props.isCurrent} />
        );
    });

    return (
        <div className={slideStyles["slide"]}>
            {areaComponents}
        </div>
    );
}

export default Slide;