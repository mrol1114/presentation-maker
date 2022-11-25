import React from "react";
import Button from "./components/Button";

function controlPanel(): JSX.Element
{
    const renameHandler = () => {
    };
    const uploadFromCloudHandler = () => {
    };
    const saveInCloudHandler = () => {
    };
    const uploadFromMyComputerHandler = () => {
    };
    const saveInMyComputerHandler = () => {
    };
    const exportHandler = () => {
    };
    const previewHandler = () => {
    };

    return (
        <div className="controlPanel">
            <Button onClick={renameHandler} actionName={"Изменить название презентации"}/>
            <Button onClick={uploadFromCloudHandler} actionName={"Загрузить из облака"}/>
            <Button onClick={saveInCloudHandler} actionName={"Сохранить в облакe"}/>
            <Button onClick={uploadFromMyComputerHandler} actionName={"Загрузить с копьютера"}/>
            <Button onClick={saveInMyComputerHandler} actionName={"Сохранить на компьютерe"}/>
            <Button onClick={exportHandler} actionName={"Экспорт"}/>
            <Button onClick={previewHandler} actionName={"Предпросмотр"}/>
        </div>
    );
}

export default controlPanel;