import React from "react";
import Button from "./components/Button";
import ImageSelector from "./components/ImageSelector";
import FontSize from "./components/FontSize";
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
        dispatch(functions.undo, {});
    }

    const redoHandler = () => 
    {
        dispatch(functions.redo, {});
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

    const reduceFontSizeHandler = () =>
    {
        
    }

    const increaseFontSizeHandler = () =>
    {
        
    }

    const changeTextColorHandler = () =>
    {

    }

    const textBoldHandler = () =>
    {

    }

    const textItalicHandler = () =>
    {
        
    }

    const textUnderlinedHandler = () =>
    {
        
    }

    const openImageSelectorHandler = () => 
    {
        let selector = document.getElementById("image-selector");
        selector?.classList.add(styles["selector-active"]);
    }

    let textTools: boolean = true;

    return (
        <div id="toolbar" className={styles["toolbar"]}>
            <div className={styles["toolbar__slide-tools"]}>
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
                    onClick={openImageSelectorHandler} />
                <ImageSelector />
                <Button additionalClass={styles["elipse"] + " " + styles["icon"]}
                    onClick={addElipseHandler} />
                <Button additionalClass={styles["rectangle"] + " " + styles["icon"]}
                    onClick={addRectangleHandler} />
                <Button additionalClass={styles["triangle"] + " " + styles["icon"]}
                    onClick={addTriangleHandler} />
            </div>
            <div className={textTools ? styles["toolbar__text-tools-active"] : styles["toolbar__text-tools-inactive"]}>
                <Button additionalClass={styles["increase-font-size"] + " " + styles["icon"]}
                    onClick={increaseFontSizeHandler} />
                <FontSize />
                <Button additionalClass={styles["reduce-font-size"] + " " + styles["icon"]}
                    onClick={reduceFontSizeHandler} />
                <Button additionalClass={styles["text-color"] + " " + styles["icon"]}
                    onClick={changeTextColorHandler} />
                <Button additionalClass={styles["bold"] + " " + styles["icon"]}
                    onClick={textBoldHandler} />
                <Button additionalClass={styles["italic"] + " " + styles["icon"]}
                    onClick={textItalicHandler} />
                <Button additionalClass={styles["underlined"] + " " + styles["icon"]}
                    onClick={textUnderlinedHandler} />
            </div>
        </div>
    );
}

export default Toolbar;