import React from "react";
import Button from "./components/Button";
import * as types from "../../common/types";
import * as functions from "../../common/functions";
import PresentationName from "./components/PresentationName";
import styles from "./styles.module.css";
import { dispatch, setState } from "../../actions/actions";

function ControlPanel(props: {name: string, presentationMaker: types.PresentationMaker}): JSX.Element
{
    const renameHandler = () => {
    };
    const uploadFromCloudHandler = () => {
    };
    const saveInCloudHandler = () => {
    };
    const uploadFromMyComputerHandler = () => 
    {
        const input = document.getElementById('sortpicture');
        if (input === null)
        {
            return;
        }
        input.click();
        input.onchange = (e) => 
        {
            const file_data = input['files'][0];
            const reader = new FileReader();
            reader.readAsText(file_data);
            reader.onload = function() 
            {
                let result = reader.result;
                if (typeof result === "string")
                {
                    setState(functions.convertJsonToPresentationMaker(result));
                }
            };
        }
    };
    const saveInMyComputerHandler = () => 
    {
        dispatch(functions.convertPresentationMakerToJson, {presentationMaker: props.presentationMaker})
    };
    const exportHandler = () => {
    };
    const previewHandler = () => {
    };

    return (
        <div className = {styles["control-panel"]}>
            <input className={styles['fileInput']} id="sortpicture" type="file"/>
            <PresentationName name="Моя презентация"/>
            <Button onClick={renameHandler} actionName={"Изменить название"}/>
            <Button onClick={uploadFromCloudHandler} actionName={"Загрузить из облака"}/>
            <Button onClick={saveInCloudHandler} actionName={"Сохранить в облакe"}/>
            <Button onClick={uploadFromMyComputerHandler} actionName={"Загрузить с копьютера"}/>
            <Button onClick={saveInMyComputerHandler} actionName={"Сохранить на компьютерe"}/>
            <Button onClick={exportHandler} actionName={"Экспорт"}/>
            <Button onClick={previewHandler} actionName={"Предпросмотр"}/>
        </div>
    );
}

export default ControlPanel;