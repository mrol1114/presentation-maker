import React, { useEffect, useState } from "react";
import Toolbar from "../toolbar/Toolbar";
import SlidesGroup from "../slidesGroup/SlidesGroup";
import Workboard from "../workboard/Workboard";
import ControlPanel from "../controlPanel/ControlPanel";
import appStyles from "./styles/app.module.css";
import "./styles/commonStyles.css";
import * as consts from "../../common/consts";
import {redo, undo} from "../../actions/local-history/localHistoryActions";
import { deleteAreas } from "../../actions/areas/areasActions";
import { deleteSlides } from "../../actions/slides/slidesActions";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "../../store";

const mapState = (state: RootState) => ({
    presentationElements: state.presentationElements,
    localHistory: state.localHistory,
});

const mapDispatch = {
    undo: undo,
    redo: redo,
    deleteAreas: deleteAreas,
    deleteSlides: deleteSlides,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function App(props: Props): JSX.Element 
{
    const [isControl, setIsControl] = useState(false);

    const deleteSelected = () => {
        const updatedPresentationElements = props.presentationElements;

        (updatedPresentationElements.currentAreaIndex !== consts.notSelectedIndex ||
        updatedPresentationElements.selectedAreasIndexes.length > 0) 
        ? props.deleteAreas() : props.deleteSlides();
    }

    const keyDownCheck = (key: string) => {
        if (key === "Control") setIsControl(true);
        else if (key === "Delete") deleteSelected();

        if (key === "z" && isControl) props.undo();
        else if (key === "y" && isControl) props.redo();
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
                <ControlPanel />
                <Toolbar />
            </div>

            <div className={appStyles["workspace"]}>
                <Workboard isControl={isControl} />
                <SlidesGroup isControl={isControl} />
            </div>
        </div>
    );
}

export default connector(App);