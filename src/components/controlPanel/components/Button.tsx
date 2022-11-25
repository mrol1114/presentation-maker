import React from "react";
import styles from "./styles/button.module.css";

function Button(props: {onClick: Function, actionName: string}): JSX.Element
{
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick();
    };

    return (
        <button className={styles['button']} onClick={buttonHandler}>
            {props.actionName}
        </button>
    );
}

export default Button;