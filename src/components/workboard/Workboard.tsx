import React from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";
import styles from "./styles/styles.module.css";

function Workboard(props: {slideElements: types.Slide[], currentSlideIndex: number}): JSX.Element
{
    if (props.slideElements.length == 0)
    {
        return (<div className={styles["workboard"]}></div>);
    }

    return (
        <div className={styles["workboard"]}>
            <Slide slideElement={props.slideElements[props.currentSlideIndex]} />
        </div>
    );
}

export default Workboard;