import React from "react";
import Slide from "../slide/Slide";
import workboadStyles from "./workboard.module.css";
import * as areaActions from "../../../actions/areas/areasActions";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "../../../store";
import useWorkboard from "./useWorkboard";

const mapState = (state: RootState) => ({
    slidesGroup: state.presentationElements.slidesGroup,
    currSlideIndex: state.presentationElements.currentSlideIndex,
    currAreaIndex: state.presentationElements.currentAreaIndex,
    selectedAreasIndexes: state.presentationElements.selectedAreasIndexes,
    presentationElements: state.presentationElements,
});

const mapDispatch = {
    updateInDragAreas: areaActions.updateInDragAreas,
    updateAreas: areaActions.updateAreas,
    assignAreaIndex: areaActions.assignAreaIndex,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    isControl: boolean,
};

function Workboard(props: Props): JSX.Element {
    useWorkboard(props);

    return (
        <div id="workboard" className={workboadStyles["workboard"]}>
            <div id="workboard-slide" className={props.slidesGroup.length 
                ? workboadStyles["workboard__slide"] 
                : workboadStyles["workboard__without-slide"]}
            >
                {props.slidesGroup.length !== 0 &&
                    <Slide slideElement={props.slidesGroup[props.currSlideIndex]} 
                        index={props.currSlideIndex} 
                        isCurrent={true} 
                        isControl={props.isControl}
                    />
                }
            </div>
        </div>
    );
}

export default connector(Workboard);