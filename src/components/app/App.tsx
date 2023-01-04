import React, { useEffect, useState } from "react";
import Toolbar from "../toolbar/Toolbar";
import SlidesGroup from "../slidesGroup/SlidesGroup";
import Workboard from "../workboard/Workboard";
import ControlPanel from "../controlPanel/ControlPanel";
import { dispatch, getState } from "../../actions/actions";
import * as types from "../../common/types";
import * as functions from "../../common/functions";
import appStyles from "./styles/app.module.css";
import "./styles/commonStyles.css";
import * as consts from "../../common/consts";

function App(): JSX.Element 
{
    const presentationMaker: types.PresentationMaker = getState();
    const presentationElements: types.PresentationElements = presentationMaker.presentationElements;

    if (!presentationMaker.localHistory.length)
    {
        presentationMaker.localHistory = [presentationMaker.presentationElements];
    }

    const [isControl, setIsControl] = useState(false);

    const deleteSelected = () => {
        const updatedPresentationElements = getState().presentationElements;

        (updatedPresentationElements.currentAreaIndex !== consts.notSelectedIndex ||
        updatedPresentationElements.selectedAreasIndexes.length > 0) 
        ? dispatch(functions.deleteAreas, {}) : dispatch(functions.deleteSlides, {});
    }

    const keyDownCheck = (key: string) => {
        if (key === "Control") setIsControl(true);
        else if (key === "Delete") deleteSelected();

        if (key === "z" && isControl) dispatch(functions.undo, {});
        else if (key === "y" && isControl) dispatch(functions.redo, {});
    }

    useEffect(() => {
        function onKeyDown(e) {
            keyDownCheck(e.key);
        };

        function onKeyUp(e) {
            if (e.key === "Control") setIsControl(false);
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        }
    }, [isControl]);

    return (
        <div className={appStyles["app"]}>
            <div>
                <ControlPanel presentationMaker={presentationMaker}/>
                <Toolbar presentationElements={presentationElements} />
            </div>

            <div className={appStyles["workspace"]}>
                <Workboard presentationElements={presentationElements} isControl={isControl} />
                <SlidesGroup presentationElements={presentationElements} isControl={isControl} />
            </div>
        </div>
    );
}

export default App;