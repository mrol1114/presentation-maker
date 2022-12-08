import React from "react";
import { dispatch } from "../../../actions/actions";
import * as functions from "../../../common/functions";
import styles from "./styles/styles.module.css";

function StrokeWidth(): JSX.Element
{
    const onChangeHandler = e =>
    {
        if (e.target.value >= 0)
        {
            dispatch(functions.updateText, {fontSize: e.target.value});
        }
    }

    return (
        <div className={styles["text-stroke-width"]}>
            <div className={styles["stroke-width-icon"]}></div>
            <input className={styles["stroke-width"]} type="number" onChange={onChangeHandler} />
        </div>
    );
}

export default StrokeWidth;