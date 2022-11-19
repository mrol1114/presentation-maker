import React from "react";
import Area from "./components/Area";
import type * as types from "../../common/types";

function Slide(props: {slideElement: types.Slide}): JSX.Element
{
    const areaElements = props.slideElement.areas;
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