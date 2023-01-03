import React, {useEffect, useState} from "react";
import { dispatch } from "../../../actions/actions";
import * as functions from "../../../common/functions";
import styles from "./styles/styles.module.css";

function StrokeWidth(props: {value: number, type: string}): JSX.Element
{
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onChangeHandler = e =>
    {
        setValue(e.target.value);
        if (props.type === "text")
        {
            dispatch(functions.updateText, {strokeWidth: e.target.value});
        }
        else if (props.type === "primitive")
        {
            dispatch(functions.updateGraphicPrimitive, {strokeWidth: e.target.value});
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