import React, { useEffect } from "react";
import Area from "./components/Area";
import type * as types from "../../common/types";
import slideStyles from "./slide.module.css"
import { useSlideRef } from "./useSlideRef";
import { dispatch } from "../../actions/actions";
import * as functions from "../../common/functions";

function Slide(props: {slideElement: types.Slide, index: number, isCurrent: boolean, isControl: boolean}): JSX.Element
{
    const slideRef = useSlideRef();

    const path: string = props.slideElement.backgroundImage.type === "imageUrl" ? 
        props.slideElement.backgroundImage.path : props.slideElement.backgroundImage.base64;

    const style = {
        backgroundImage: "url(" + path + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
    };

    useEffect(() => {
        if (props.isCurrent || !slideRef.current) return;

        const slideElement = slideRef.current;

        function onMouseDown() {
            props.isControl ? dispatch(functions.selectSlides, [props.index]) : 
                dispatch(functions.assignSlideIndex, props.index);
        }

        slideElement.addEventListener("mousedown", onMouseDown);

        return () => {
            slideElement.removeEventListener("mousedown", onMouseDown);
        }
    }, [props.index, props.isControl]);

    const areaElements = props.slideElement.areas.map((area: types.Area, index: number) => {
        return area.contains ? (
            <Area areaElement={area} key={area.id} areaIndex={index} isCurrentSlide={props.isCurrent} slideRef={slideRef.current} isControl={props.isControl} />
        ) : null;
    }).filter(value => value);

    return (
        <div ref={slideRef} className={slideStyles["slide"]} style={style}>
            {areaElements}
        </div>
    );
}

export default Slide;