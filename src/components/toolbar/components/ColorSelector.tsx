import React, { useEffect, useState } from "react";
import { dispatch, getState } from "../../../actions/actions";
import * as functions from "../../../common/functions";
import styles from "./styles/styles.module.css";
import buttonStyles from "./styles/button.module.css";
import * as consts from "../../../common/consts";

function ColorSelector(prop: { type: string, styleName: string }): JSX.Element {
    const [areaIndex, setAreaIndex] = useState(0);

    useEffect(() => {
        const input = document.querySelectorAll("#" + prop.type)[0];

        const currAreaIndex = getState().presentationElements.currentAreaIndex;
        if (currAreaIndex !== consts.notSelectedIndex) {
            setAreaIndex(currAreaIndex);
        }

        const onFocusoutHandler = (e) => {
            const color: string = e.target.value;

            dispatch(functions.assignAreaIndex, areaIndex);

            switch (prop.type) {
                case "background":
                    dispatch(functions.updateSlideProperty, { backgroundImage: { type: "imageUrl", path: "" }, backgroundColor: color });
                    break;
                case "text":
                    dispatch(functions.updateText, { color: color });
                    break;
                case "textStroke":
                    dispatch(functions.updateText, { strokeColor: color });
                    break;
                case "primitive":
                    dispatch(functions.updateGraphicPrimitive, { color: color });
                    break;
                case "primitiveStroke":
                    dispatch(functions.updateGraphicPrimitive, { strokeColor: color });
            }
        }

        input.addEventListener("focusout", onFocusoutHandler);

        return () => {
            input.removeEventListener("focusout", onFocusoutHandler);
        }
    });

    return (
        <label className={buttonStyles["button"]}>
            <div className={styles["color-button"] + " " + styles[prop.styleName]}></div>
            <input id={prop.type} className={styles["input"]} type="color" ></input>
        </label>
    );
}

export default ColorSelector;