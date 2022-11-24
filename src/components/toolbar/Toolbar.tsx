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

    const addImageHandler = () => 
    {
        
    }

    const addImageBaseHandler = event =>
    {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            dispatch(functions.addArea, {areaType: "imageBase64", path: fileReader.result});
        }
        fileReader.readAsDataURL(event.target.files[0]);
    }

    const addImageUrlHandler = () =>
    {
        const url: string = document.getElementsByTagName("input")[1].value;
        dispatch(functions.addArea, {areaType: "imageUrl", path: url});
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
            <input className={styles["image-base"]} type="file" accept=".jpg, .jpeg, .png" onChange={addImageBaseHandler} />
            <input className={styles["image-url"]} type="url" />
            <button className={styles['button']} type="submit" onClick={addImageUrlHandler}>Добавить</button>
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