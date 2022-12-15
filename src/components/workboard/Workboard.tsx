import React, { useEffect, useRef } from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";
import styles from "./styles.module.css";

function Workboard(props: {slideElements: types.Slide[], currentSlideIndex: number}): JSX.Element
{
    return (
        <div className={styles["workboard"]}>
            <div id="workboard-slide" className={props.slideElements.length ? styles["workboard__slide"] : styles["workboard__without-slide"]}>
                { props.slideElements.length !== 0 &&
                    <Slide slideElement={props.slideElements[props.currentSlideIndex]} isCurrent={true} />
                }
            </div>
        </div>
    );
}

export default Workboard;