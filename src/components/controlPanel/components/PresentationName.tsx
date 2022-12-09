import React from "react";
import styles from "./styles/styles.module.css";

function PresentationName(props: {name: string}): JSX.Element
{
    return (
        <div className = {styles["presentation-name-label"]}> 
            <input className = {styles["presentation-name"]} placeholder = {props.name}></input>
        </div>
    );
}

export default PresentationName;