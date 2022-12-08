import React, {useState} from "react";
import { dispatch } from "../../../actions/actions";
import * as functions from "../../../common/functions";
import styles from "./styles/styles.module.css";

function StrokeWidth(props: {value: number}): JSX.Element
{
    const [value, setValue] = useState(0);

    const onChangeHandler = e =>
    {
        setValue(e.target.value);
        dispatch(functions.updateText, {fontSize: e.target.value});
    }

    return (
        <div className={styles["text-stroke-width"]}>
            <div className={styles["stroke-width-icon"]}></div>
            <input className={styles["stroke-width"]} type="number" value={value ? value : props.value} onChange={onChangeHandler} />
        </div>
    );
}

export default StrokeWidth;