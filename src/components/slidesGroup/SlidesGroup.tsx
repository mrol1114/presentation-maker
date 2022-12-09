import React from "react";
import Slide from "../slide/Slide";
import type * as types from "../../common/types";
import styles from "./slidesGroup.module.css";

function SlidesGroup(props: {slideElements: types.Slide[]}): JSX.Element
{
    const slideComponents = props.slideElements.map((slideElement: types.Slide) => {
        return (
            <li key={slideElement.id} className={styles["slide"]}>
                <Slide slideElement={slideElement} />
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