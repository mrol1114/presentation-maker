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

    const addTextHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "text"});
    }

    const addImageHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "image"});
    }

    const addElipseHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "primitive", primitiveType: "ellipse"});
    }

    const addRectangleHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "primitive", primitiveType: "rectangle"});
    }

    const addTriangleHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "primitive", primitiveType: "triangle"});
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
                onClick={addTextHandler} />
            <Button additionalClass={styles["image"] + " " + styles["icon"]}
                onClick={addImageHandler} />
            <Button additionalClass={styles["elipse"] + " " + styles["icon"]}
                onClick={addElipseHandler} />
            <Button additionalClass={styles["rectangle"] + " " + styles["icon"]}
                onClick={addRectangleHandler} />
            <Button additionalClass={styles["triangle"] + " " + styles["icon"]}
                onClick={addTriangleHandler} />
        </div>
    );
}

export default Toolbar;