import React from "react";
import { dispatch } from "../../../actions/actions";
import * as functions from "../../../common/functions";
import styles from "./styles/styles.module.css";

function ImageSelector(): JSX.Element
{
    const addImageBaseHandler = e =>
    {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            dispatch(functions.addArea, {areaType: "imageBase64", path: fileReader.result});
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }

    const addImageUrlHandler = () =>
    {
        const url: string|undefined = document.getElementById("selector")?.getElementsByTagName("input")[1].value;
        dispatch(functions.addArea, {areaType: "imageUrl", path: url});
    }

    const closeImageSelectorHandler = () => 
    {
        const selector = document.getElementById("image-selector");
        selector?.classList.remove(selector?.classList[1]);
    }

    return (
        <div id="image-selector" className={styles["image-selector"]}>
            <div id="selector" className={styles["image-selector__content"]} onClick={e => e.stopPropagation()}>
                <label className={styles["image-base"]}>
                    <div className={styles["image-base__text"]}>Загрузить с компьютера</div>
                    <input className={styles["image-base__input"]} type="file" accept=".jpg, .jpeg, .png" onChange={addImageBaseHandler} />
                </label>
                <input id="image-url" className={styles["image-url"]} placeholder="Добавьте URL изображения" type="url" autoComplete="off"/>
                <button className={styles["button-image-add"]} type="submit" onClick={addImageUrlHandler}>Добавить</button>
                <button className={styles["button-ready"]} onClick={closeImageSelectorHandler}>Готово</button>
            </div>
        </div>
    );
}

export default ImageSelector;