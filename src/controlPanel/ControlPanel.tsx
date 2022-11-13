import React from "react";
import Button from "./components/Button";

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
            <Button onClick={fileHandler} actionName={"Файл"}/>
            <Button onClick={editHandler} actionName={"Правка"}/>
            <Button onClick={viewHandler} actionName={"Вид"}/>
            <Button onClick={insertHandler} actionName={"Вставка"}/>
            <Button onClick={slideHandler} actionName={"Слайд"}/>
        </div>
    );
}

export default ControlPanel;