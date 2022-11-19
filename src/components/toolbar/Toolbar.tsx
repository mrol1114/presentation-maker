import React from "react";
import Button from "./components/Button";
import { dispatch } from "../../actions/actions";
import * as functions from "../../common/functions";
import styles from "./styles/styles.module.css";


function Toolbar(): JSX.Element
{
    const addSlideHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const undoHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const redoHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const backgroundImageHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const backgroundColorHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const textHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const imageHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const elipseHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const rectangleHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const triangleHandler = () => 
    {
        dispatch(functions.addSlide, {});
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