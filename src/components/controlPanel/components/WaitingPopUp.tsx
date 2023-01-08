import React from "react";
import { connect } from "react-redux";
import styles from "./styles/styles.module.css"

const connector = connect(null);

function WaitingPopUp(prop: {isPopUp: boolean}): JSX.Element {
    return (
        <div className={prop.isPopUp ? styles["pop-up-active"] : styles["pop-up-inactive"]}>
            <div className={styles["pop-up"]}>
                <a>Загрузка файла...</a>
            </div>
        </div>
    );
}

export default connector(WaitingPopUp);