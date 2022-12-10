import React from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";
import styles from "./styles.module.css";

function Workboard(props: {slideElements: types.Slide[], currentSlideIndex: number}): JSX.Element
{
    return (
        <div className={styles["workboard"]}>
            <div className={props.slideElements.length ? styles["workboard__slide"] : styles["workboard__without-slide"]}>
                { props.slideElements.length !== 0 &&
                    <Slide slideElement={props.slideElements[props.currentSlideIndex]} />
                }
            </div>
        </div>
    );
}

export default Workboard;