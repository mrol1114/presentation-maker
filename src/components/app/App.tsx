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
    const presentationName: string = presentationMaker.name;
    const presentationElements: types.PresentationElements = presentationMaker.presentationElements;
    const slideElements: types.Slide[] = presentationMaker.presentationElements.slidesGroup;

    if (!presentationMaker.localHistory.length)
    {
        presentationMaker.localHistory = [presentationMaker.presentationElements];
    }

    const [isControl, setIsControl] = useState(false);

    function deleteSelected() {
        if (presentationElements.currentAreaIndex !== consts.notSelectedIndex ||
        presentationElements.selectedAreasIndexes.length > 0) {
            dispatch(functions.deleteAreas, {});
        }
    }

    useEffect(() => {
        function keyDownCheck(key: string) {
            if (key === "Control") setIsControl(true);
            else if (key === "Delete") deleteSelected();

            if (key === "z" && isControl) dispatch(functions.undo, {});
            else if (key === "y" && isControl) dispatch(functions.redo, {});
        }

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
                <ControlPanel name={presentationName} presentationMaker={presentationMaker}/>
                <Toolbar presentationElements={presentationElements} />
            </div>

            <div className={appStyles["workspace"]}>
                <Workboard presentationElements={presentationElements} isControl={isControl} />
                <SlidesGroup slideElements={slideElements} isControl={isControl} />
            </div>
        </div>
    );
}

export default App;