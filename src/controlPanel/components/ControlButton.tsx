import React from "react";
import styles from "./styles/control-button.module.css";

function ControlButton(props: {onClick: Function, actionName: string}): JSX.Element
{
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.onClick();
    };

    return (
        <button className={styles['button']} onClick={buttonHandler}>
            {props.actionName}
        </button>
    );
}

export default ControlButton;