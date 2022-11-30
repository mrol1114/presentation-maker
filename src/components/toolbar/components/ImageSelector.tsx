import React from "react";
import { dispatch } from "../../../actions/actions";
import * as functions from "../../../common/functions";
import styles from "./styles/styles.module.css";

function ImageSelector(): JSX.Element
{
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

    return (
        <div id="image-selector" className={styles["image-selector"]}>
            <input className={styles["image-base"]} type="file" accept=".jpg, .jpeg, .png" onChange={addImageBaseHandler} />
            <input className={styles["image-url"]} type="url" />
            <button className={styles['button']} type="submit" onClick={addImageUrlHandler}>Добавить</button>
        </div>
    );
}

export default ImageSelector;