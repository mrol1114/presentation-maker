import React from "react";
import type * as types from '../../../../common/types';
import styles from "./styles.module.css";

function ImageComponent(prop: {imageElement: types.ImageInfo}): JSX.Element
{
    return (
        prop.imageElement.type === "imageUrl" 
        ? <img className={styles["image"]} src={prop.imageElement.path} alt={"картинка"}/> 
        : <img className={styles["image"]} src={prop.imageElement.base64} alt={"картинка"}/>
    );
}

export default ImageComponent;