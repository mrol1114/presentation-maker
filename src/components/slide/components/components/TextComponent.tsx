import React from "react";
import { dispatch } from "../../../../actions/actions";
import type * as types from "../../../../common/types";
import * as functions from "../../../../common/functions";

function TextComponent(prop: {textElement: types.TextInfo}): JSX.Element
{
    const onChangeHandler = event => {
        dispatch(functions.updateText, {text: event.target.value});
    }

    const style = {

    };

    return (
        <input type="textarea" value={prop.textElement.text} onChange={onChangeHandler} style={style} />
    );
}

export default TextComponent;