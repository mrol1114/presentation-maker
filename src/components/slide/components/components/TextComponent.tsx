import React from "react";
import type * as types from "../../../../common/types";
import * as functions from "../../../../common/functions";
import styles from "./styles.module.css";
import { connect, ConnectedProps } from "react-redux";
import * as areaContentActions from "../../../../actions/area-content/areaContentActions";

const mapDispatch = {
    updateText: areaContentActions.updateText,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {textElement: types.TextInfo};

function TextComponent(props: Props): JSX.Element
{
    const onChangeHandler = e => {
        props.updateText({text: e.target.value});
    }

    const style = {
        color: props.textElement.color,
        fontFamily: props.textElement.font,
        fontSize: props.textElement.fontSize,
        borderWidth: Number(props.textElement.strokeWidth),
        borderColor: props.textElement.strokeColor,
    };

    return (
        <input type="textarea" 
            className={styles["text"]} 
            value={props.textElement.text} 
            onChange={onChangeHandler} 
            style={style}
            placeholder="Введите текст" 
        />
    );
}

export default connector(TextComponent);