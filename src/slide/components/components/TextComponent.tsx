import React from "react";
import type * as types from '../../../utils/types';

function TextComponent(prop: {textElement: types.TextInfo}): JSX.Element
{
    const style = {

    };

    return (
        <input type="textarea" value={prop.textElement.text} style={style} />
    );
}

export default TextComponent;