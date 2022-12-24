import React from "react";
import Slide from "../slide/Slide";
import type * as types from "../../common/types";
import styles from "./slidesGroup.module.css";

function SlidesGroup(props: {slideElements: types.Slide[], isControl: boolean}): JSX.Element
{
    const slideComponents = props.slideElements.map((slideElement: types.Slide) => {
        return (
            <li key={slideElement.id} className={styles["slide-wrapper"]}>
                <Slide slideElement={slideElement} isCurrent={false} isControl={props.isControl} />
            </li>
        );
    });

    return (
        <ol className={styles["slides-group"]}>
            {slideComponents}
        </ol>
    );
}

export default SlidesGroup;