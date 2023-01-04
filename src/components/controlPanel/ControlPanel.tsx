import React from "react";
import { jsPDF } from "jspdf";
import Button from "./components/Button";
import * as types from "../../common/types";
import * as functions from "../../common/functions";
import PresentationName from "./components/PresentationName";
import styles from "./styles.module.css";
import { dispatch, setState } from "../../actions/actions";

function ControlPanel(props: {presentationMaker: types.PresentationMaker}): JSX.Element
{
    const renameHandler = () => {
        const newName = document.getElementsByTagName("input")[1].value;

        if (newName)
        {
            dispatch(functions.updateName, newName);
        }
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
    const exportHandler = () => 
    {
        const PM = document.getElementById("root");
        if (PM === null)
        {
            return;
        }
        const doc = new jsPDF({
            orientation: "landscape",
			format: 'a1',
			unit: 'px',
		});
        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();
        const imgData = "/components/toolbar/images/";

        doc.addImage(imgData, 'JPEG', 0, 0, width, height);
        doc.setFont('Inter-Regular', 'normal');
        doc.html(PM, {
            async callback(doc) {
                await doc.save('pdf_name');
            },
        });
    };
    const previewHandler = () => {
    };

    return (
        <div className = {styles["control-panel"]}>
            <input className={styles['fileInput']} id="sortpicture" type="file"/>
            <PresentationName presentationName={props.presentationMaker.name} />
            <Button onClick={renameHandler} actionName={"Change name"}/>
            <Button onClick={uploadFromCloudHandler} actionName={"Upload from cloud"}/>
            <Button onClick={saveInCloudHandler} actionName={"Save in cloud"}/>
            <Button onClick={uploadFromMyComputerHandler} actionName={"Upload from desktop"}/>
            <Button onClick={saveInMyComputerHandler} actionName={"Save in desktop"}/>
            <Button onClick={exportHandler} actionName={"Export"}/>
            <Button onClick={previewHandler} actionName={"Preview"}/>
        </div>
    );
}

export default ControlPanel;