import React from "react";
import Area from "./components/Area";
import type * as types from "../../common/types";
import slideStyles from "./slide.module.css"
import { useSlideRef } from "./useSlideRef";

function Slide(props: {slideElement: types.Slide, isCurrent: boolean, isControl: boolean}): JSX.Element
{
    const slideRef = useSlideRef();

    const areaElements = props.slideElement.areas.map((area: types.Area, index: number) => {
        return area.contains ? (
            <Area areaElement={area} key={area.id} areaIndex={index} isCurrentSlide={props.isCurrent} slideRef={slideRef.current} isControl={props.isControl} />
        ) : null;
    }).filter(value => value);

    return (
        <div ref={slideRef} className={slideStyles["slide"]}>
            {areaElements}
        </div>
    );
}

export default Slide;