import React, { useEffect, useState } from "react";
import styles from "./styles/styles.module.css";
import { dispatch } from "../../../actions/actions";
import * as functions from "../../../common/functions";

function TextFont(prop: {isHidden: boolean, textFont: string}): JSX.Element
{
    const [value, setValue] = useState("");

    useEffect(() => {
        if (value !== "" && value !== prop.textFont)
        {
            dispatch(functions.updateText, {font: value});
        }
    }, [value]);

    return (
        <div id="font-menu" className={prop.isHidden ? styles["content"] + " " + styles["content-inactive"] : 
            styles["content"] + " " + styles["content-active"]}>
            <a onClick={() => {setValue("Arial")}}>Arial</a>
            <a onClick={() => {setValue("Arial Black")}}>Arial Black</a>
            <a onClick={() => {setValue("Arial Narrow")}}>Arial Narrow</a>
            <a onClick={() => {setValue("Times New Roman")}}>Times New Roman</a>
            <a onClick={() => {setValue("Verdana")}}>Verdana</a>
            <a onClick={() => {setValue("Georgia")}}>Georgia</a>
            <a onClick={() => {setValue("Trebuchet MS")}}>Trebuchet MS</a>
            <a onClick={() => {setValue("Impact")}}>Impact</a>
            <a onClick={() => {setValue("Tahoma")}}>Tahoma</a>
            <a onClick={() => {setValue("Courier New")}}>Courier New</a>
            <a onClick={() => {setValue("Comic Sans MS")}}>Comic Sans MS</a>
            <a onClick={() => {setValue("Brush Script MT")}}>Brush Script MT</a>
            <a onClick={() => {setValue("Lucida Sans")}}>Lucida Sans</a>
            <a onClick={() => {setValue("Lucida Console")}}>Lucida Console</a>
        </div>
    );
}

export default TextFont;