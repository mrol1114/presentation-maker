import React from "react";
import styles from "./styles/button.module.css";

function Button(props: {additionalClass: string, onClick: Function}): JSX.Element
{
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick();
    };

    return (
        <button className={styles['button'] + " " + props.additionalClass} onClick={buttonHandler}>
        </button>
    );
}

export default Button;