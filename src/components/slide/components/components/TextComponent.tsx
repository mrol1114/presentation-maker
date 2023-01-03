import React from "react";
import { dispatch } from "../../../../actions/actions";
import type * as types from "../../../../common/types";
import * as functions from "../../../../common/functions";
import styles from "./styles.module.css";

function TextComponent(prop: {textElement: types.TextInfo}): JSX.Element
{
    const onChangeHandler = e => {
        dispatch(functions.updateText, {text: e.target.value});
    }

    const style = {
        color: prop.textElement.color,
        fontFamily: prop.textElement.font,
        fontSize: prop.textElement.fontSize,
        borderWidth: Number(prop.textElement.strokeWidth),
        borderColor: prop.textElement.strokeColor,
    };

    return (
        <input type="textarea" className={styles["text"]} value={prop.textElement.text} onChange={onChangeHandler} style={style} />
    );
}

export default TextComponent;