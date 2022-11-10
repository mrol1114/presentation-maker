import React from "react";
import styles from "./styles/button.module.css";

function Button(props: {additinalClass: string, onClick: Function}): JSX.Element
{
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.onClick();
    };

    return (
        <button className={styles['button'] + " " + props.additinalClass} onClick={buttonHandler}>
        </button>
    );
}

export default Button;