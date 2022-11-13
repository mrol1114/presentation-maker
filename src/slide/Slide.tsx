import React from "react";
import Area from "./components/Area";
import { presentationState } from "../utils/consts";
import type * as types from "../utils/types";

function Slide(prop: {slideIndex: number}): JSX.Element
{
    const areaElements = presentationState.curPresentationState.presentationElements.slidesGroup[prop.slideIndex].areas;
    const areaComponents = areaElements.map((area: types.Area) => {
        return (
            <Area areaElement={area} key={area.id} />
        );
    });

    return (
        <div className="slide">
            {areaComponents}
        </div>
    );
}

export default Slide;