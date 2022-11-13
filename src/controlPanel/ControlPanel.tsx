import React from "react";
import ControlButton from "./components/ControlButton";

function ControlPanel(): JSX.Element
{
    const fileHandler = () => {
    };
    const editHandler = () => {
    };
    const viewHandler = () => {
    };
    const insertHandler = () => {
    };
    const slideHandler = () => {
    };

    return (
        <div className="controlPanel">
            <ControlButton onClick={fileHandler} actionName={"Файл"}/>
            <ControlButton onClick={editHandler} actionName={"Правка"}/>
            <ControlButton onClick={viewHandler} actionName={"Вид"}/>
            <ControlButton onClick={insertHandler} actionName={"Вставка"}/>
            <ControlButton onClick={slideHandler} actionName={"Слайд"}/>
        </div>
    );
}

export default ControlPanel;