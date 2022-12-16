import React, { useEffect, useRef } from "react";
import * as types from "../../common/types";
import Slide from "../slide/Slide";
import styles from "./styles.module.css";
import { useWorkboardSlideRef } from "./useWorkboardSlideRef";

function Workboard(props: {slideElements: types.Slide[], currentSlideIndex: number}): JSX.Element
{
    const ref = useWorkboardSlideRef();

    return (
        <div className={styles["workboard"]}>
            <div ref={ref} className={props.slideElements.length ? styles["workboard__slide"] : styles["workboard__without-slide"]}>
                { props.slideElements.length !== 0 &&
                    <Slide slideElement={props.slideElements[props.currentSlideIndex]} isCurrent={true} />
                }
            </div>
        </div>
    );
}

export default Workboard;