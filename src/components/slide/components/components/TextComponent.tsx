import React from "react";
import { dispatch } from "../../../../actions/actions";
import type * as types from "../../../../common/types";
import * as functions from "../../../../common/functions";
import styles from "./styles.module.css";

function TextComponent(prop: {textElement: types.TextInfo, id: string}): JSX.Element
{
    const onChangeHandler = e => {
        dispatch(functions.updateText, {text: e.target.value});
    }

    const style = {
        color: prop.textElement.color,
        fontFamily: prop.textElement.font,
        fontSize: prop.textElement.fontSize,
        borderWidth: prop.textElement.strokeWidth,
        borderColor: prop.textElement.strokeColor,
    };

    return (
        <input id={prop.id} type="textarea" className={styles["text"]} value={prop.textElement.text} onChange={onChangeHandler} style={style} />
    );
}

export default TextComponent;