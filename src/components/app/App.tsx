import React from "react";
import Toolbar from "../toolbar/Toolbar";
import SlidesGroup from "../slidesGroup/SlidesGroup";
import Workboard from "../workboard/Workboard";
import ControlPanel from "../controlPanel/ControlPanel";
import { getState } from "../../actions/actions";
import * as types from "../../common/types";
import "./App.css";

function App(): JSX.Element 
{
    const presentationMaker: types.PresentationMaker = getState();
    const currentSlideIndex: number = presentationMaker.presentationElements.currentSlideIndex;
    const slideElements: types.Slide[] = presentationMaker.presentationElements.slidesGroup;

    return (
        <div className="App">
            <div>
                <ControlPanel />
                <Toolbar />
            </div>

            <div>
                <SlidesGroup slideElements={slideElements} />
                <Workboard slideElements={slideElements} currentSlideIndex={currentSlideIndex} />
            </div>
        </div>
    );
}

export default App;