import React, {useEffect, useState} from "react";
import { dispatch } from "../../../actions/actions";
import * as functions from "../../../common/functions";
import styles from "./styles/styles.module.css";

function StrokeWidth(props: {value: number, type: string}): JSX.Element
{
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(props.value.toString());
    }, [props.value]);

    const onChangeHandler = e =>
    {
        const newValue: number = e.target.value && e.target.value >= 0 ? Number(e.target.value) : 0;
        setValue(newValue.toString());
        if (props.type === "text")
        {
            dispatch(functions.updateText, {strokeWidth: newValue});
        }
        else if (props.type === "primitive")
        {
            dispatch(functions.updateGraphicPrimitive, {strokeWidth: newValue});
        }
    }

    return (
        <div className={styles["text-stroke-width"]}>
            <div className={styles["stroke-width-icon"]}></div>
            <input className={styles["stroke-width"]} type="number" value={value} onChange={onChangeHandler} />
        </div>
    );
}

export default StrokeWidth;