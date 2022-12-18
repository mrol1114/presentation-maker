import React from "react";
import Toolbar from "../toolbar/Toolbar";
import SlidesGroup from "../slidesGroup/SlidesGroup";
import Workboard from "../workboard/Workboard";
import ControlPanel from "../controlPanel/ControlPanel";
import { getState } from "../../actions/actions";
import * as types from "../../common/types";
import appStyles from "./styles/app.module.css";
import "./styles/commonStyles.css";

function App(): JSX.Element 
{
    const presentationMaker: types.PresentationMaker = getState();
    const presentationName: string = presentationMaker.name;
    const presentationElements: types.PresentationElements = presentationMaker.presentationElements;
    const slideElements: types.Slide[] = presentationMaker.presentationElements.slidesGroup;

    if (!presentationMaker.localHistory.length)
    {
        presentationMaker.localHistory = [presentationMaker.presentationElements];
    }

    return (
        <div className={appStyles["app"]}>
            <div>
                <ControlPanel name={presentationName}/>
                <Toolbar />
            </div>

            <div className={appStyles["workspace"]}>
                <Workboard presentationElements={presentationElements} />
                <SlidesGroup slideElements={slideElements} />
            </div>
        </div>
    );
}

export default App;