import React, { useRef } from "react";
import Area from "./components/Area";
import type * as types from "../../common/types";
import slideStyles from "./slide.module.css"
import { useSlideRef } from "./useSlideRef";

function Slide(props: {slideElement: types.Slide, isCurrent: boolean}): JSX.Element
{
    const ref = useSlideRef();

    const areaElements = props.slideElement.areas;
    const areaComponents = areaElements.map((area: types.Area) => {
        return area.contains ? (
            <Area areaElement={area} key={area.id} isCurrentSlide={props.isCurrent} />
        ) : null;
    });

    return (
        <div ref={ref} className={slideStyles["slide"]}>
            {areaComponents.filter(value => value)}
        </div>
    );
}

export default Slide;