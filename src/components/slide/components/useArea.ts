import React, { useEffect } from "react";
import * as areaActions from "../../../actions/areas/areasActions";
import { connect, ConnectedProps } from "react-redux";
import type * as types from "../../../common/types";

const mapDispatch = {
    selectAreas: areaActions.selectAreas,
    assignAreaIndex: areaActions.assignAreaIndex,
    updateArea: areaActions.updateArea,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    areaElement: types.Area, 
    areaIndex: number,
    isCurrentSlide: boolean,
    slideRef: HTMLDivElement|null,
    isControl: boolean
};

function useArea(props: Props)
{
    useEffect(() => {
        if (!props.isCurrentSlide) return;

        const areaElement = document.querySelectorAll("#" + props.areaElement.id)[0];

        function onMouseDown() {
            document.addEventListener("mouseup", onMouseUp);
            
            props.isControl ? props.selectAreas([props.areaIndex]) : 
                props.assignAreaIndex(props.areaIndex);
        }

        function onMouseUp() {
            if (!props.isControl && (areaElement.clientWidth !== props.areaElement.width || areaElement.clientHeight !== props.areaElement.height))
            {
                props.updateArea({width: areaElement.clientWidth, height: areaElement.clientHeight});
            }
            document.removeEventListener("mouseup", onMouseUp);
        }

        areaElement.addEventListener("mousedown", onMouseDown);

        return () => {
            areaElement.removeEventListener("mousedown", onMouseDown);
        }
    }, [props.isControl, props.areaElement, props.areaIndex]);
}

export default useArea;