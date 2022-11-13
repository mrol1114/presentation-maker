import React from "react";
import {publish} from "../common/event";
import Button from "./components/Button";
import * as functions from "./../utils/functions";
import * as consts from "./../utils/consts";
import styles from "./styles/styles.module.css";

function Toolbar(): JSX.Element
{
    const addSlideHandler = () => {
        consts.presentationState.curPresentationState = functions.addSlide(consts.presentationState.curPresentationState);
        publish("addSlide", {});
    };

    const undoHandler = () => {
        consts.presentationState.curPresentationState = functions.undo(consts.presentationState.curPresentationState);
        publish("undo", {});
    }

    const redoHandler = () => {
        consts.presentationState.curPresentationState = functions.redo(consts.presentationState.curPresentationState);
        publish("redo", {});
    }

    const backgroundImageHandler = () => {
        
    }

    const backgroundColorHandler = () => {
        
    }

    const textHandler = () => {
        consts.presentationState.curPresentationState = functions.addArea(consts.presentationState.curPresentationState);
        consts.presentationState.curPresentationState = functions.createText(consts.presentationState.curPresentationState);
        publish("text", {});
    }

    const imageHandler = () => {
        
    }

    const elipseHandler = () => {
        consts.presentationState.curPresentationState = functions.addArea(consts.presentationState.curPresentationState);
        consts.presentationState.curPresentationState = functions.createGraphicPrimitive(consts.presentationState.curPresentationState, 'elipse');
        publish("elipse", {});
    }

    const rectangleHandler = () => {
        consts.presentationState.curPresentationState = functions.addArea(consts.presentationState.curPresentationState);
        consts.presentationState.curPresentationState = functions.createGraphicPrimitive(consts.presentationState.curPresentationState, 'rectangle');
        publish("rectangle", {});
    }

    const triangleHandler = () => {
        consts.presentationState.curPresentationState = functions.addArea(consts.presentationState.curPresentationState);
        consts.presentationState.curPresentationState = functions.createGraphicPrimitive(consts.presentationState.curPresentationState, 'triangle');
        publish("triangle", {});
    }

    return (
        <div className="toolbar">
            <Button additionalClass={styles["add-slide"] + " " + styles["icon"]}
                onClick={addSlideHandler} />
            <Button additionalClass={styles["undo"] + " " + styles["icon"]}
                onClick={undoHandler} />
            <Button additionalClass={styles["redo"] + " " + styles["icon"]}
                onClick={redoHandler} />
            <Button additionalClass={styles["background-image"] + " " + styles["icon"]}
                onClick={backgroundImageHandler} />
            <Button additionalClass={styles["background-color"] + " " + styles["icon"]}
                onClick={backgroundColorHandler} />
            <Button additionalClass={styles["text"] + " " + styles["icon"]}
                onClick={textHandler} />
            <Button additionalClass={styles["image"] + " " + styles["icon"]}
                onClick={imageHandler} />
            <Button additionalClass={styles["elipse"] + " " + styles["icon"]}
                onClick={elipseHandler} />
            <Button additionalClass={styles["rectangle"] + " " + styles["icon"]}
                onClick={rectangleHandler} />
            <Button additionalClass={styles["triangle"] + " " + styles["icon"]}
                onClick={triangleHandler} />
        </div>
    );
}

export default Toolbar;