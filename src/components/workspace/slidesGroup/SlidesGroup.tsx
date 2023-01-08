import React from "react";
import Slide from "../../slide/Slide";
import slidesGroupStyles from "./slidesGroup.module.css";
import * as slideActions from "../../../actions/slides/slidesActions";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "../../../store";
import useSlidesGroup from "./useSlidesGroup";

const mapState = (state: RootState) => ({
    currSlideIndex: state.presentationElements.currentSlideIndex,
    slidesGroup: state.presentationElements.slidesGroup,
    selectedSlidesIndexes: state.presentationElements.selectedSlidesIndexes,
});

const mapDispatch = {
    moveSlides: slideActions.moveSlides,
    assignSlideIndex: slideActions.assignSlideIndex,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    isControl: boolean,
};

function SlidesGroup(props: Props): JSX.Element
{
    useSlidesGroup(props);    

    const slideComponents = props.slidesGroup.map((slideElement, index) => {
        return (
            <li key={slideElement.id} id={slideElement.id} className={props.currSlideIndex === index ? 
            slidesGroupStyles["slide-wrapper-current"] : slidesGroupStyles["slide-wrapper"]}>
                <Slide slideElement={slideElement} index={index} isCurrent={false} isControl={props.isControl} />
            </li>
        );
    });

    return (
        <ol id="slides-group" className={slidesGroupStyles["slides-group"]}>
            {slideComponents}
        </ol>
    );
}

export default connector(SlidesGroup);