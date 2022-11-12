import React from "react";
import {publish} from "../common/event";
import UndoComponent from "./components/UndoButtonComponent";
import RedoComponent from "./components/RedoButtonComponent";
import BackgroundImageButtonComponent from "./components/BackgroundImageButtonComponent";
import BackgroundColorButtonComponent from "./components/BackgroundColorButtonComponent";
import TextButtonComponent from "./components/TextButtonComponent";
import ImageButtonComponent from "./components/ImageButtonComponent";
import RectangleButtonComponent from "./components/RectangleButtonComponent";
import TriangleButtonComponent from "./components/TriangleButtonComponent";
import EllipseButtonComponent from "./components/EllipseButtonComponent";
import Button from "./components/Button";
import * as functions from "./../utils/functions";
import * as consts from "./../utils/consts";
import styles from "./styles/styles.module.css";

function Toolbar(): JSX.Element
{
    const addSlideHandler = () => {
        consts.presentationState.curPresentationState = functions.addSlide(consts.presentationState.curPresentationState);
        publish("add", {});
    };

    return (
        <div className="toolbar">
            <Button additinalClass={styles["add-slide"]} 
                onClick={addSlideHandler} />
            <UndoComponent />
            <RedoComponent />
            <BackgroundImageButtonComponent />
            <BackgroundColorButtonComponent />
            <TextButtonComponent />
            <ImageButtonComponent />
            <RectangleButtonComponent />
            <TriangleButtonComponent />
            <EllipseButtonComponent />
        </div>
    );
}

export default Toolbar;