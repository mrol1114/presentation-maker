import React, { useEffect } from "react";
import { jsPDF } from "jspdf";
import Button from "./components/Button";
import PresentationName from "./components/PresentationName";
import styles from "./styles.module.css";
import { convertJsonToState, convertStateToJson } from "../../actions/convert/convertActions";
import { connect, ConnectedProps } from "react-redux";
import { changeTitle } from "../../actions/title/titleActions";
import useDrivePicker from "react-google-drive-picker/dist";

const mapDispatch = {
    convertJsonToState: (jsonString: string) => convertJsonToState(jsonString),
    convertStateToJson: convertStateToJson,
    changeTitle: changeTitle,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function ControlPanel(props: Props): JSX.Element {
    const [openPicker, authResponse] = useDrivePicker();

    const renameHandler = () => {
        const newTitle = document.getElementsByTagName("input")[1].value;

        if (newTitle) {
            props.changeTitle(newTitle);
        }
    };

    const uploadFromCloudHandler = () => {
        openPicker({
            clientId: "1030468714467-op9s4o29m260crer5tu3n97kngv1co6i.apps.googleusercontent.com",
            developerKey: "AIzaSyDBGK9XKGSKosooSCc6AYt0utHt1XN3-vc",
            viewId: "DOCS",
            //token: token,
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
                console.log(data.docs[0])

                /*var request = new XMLHttpRequest();
                request.open('GET', data.docs[0].url);
                request.setRequestHeader('Authorization', 'Bearer ' + token);
                request.addEventListener('load', function () {
                    var item = JSON.parse(request.responseText);
                    window.open(item.webContentLink, "_self");
                });
                request.send();*/
            },
        })
    };

    const uploadFromMyComputerHandler = () => {
        const input = document.getElementById('sortpicture');
        if (input === null) {
            return;
        }
        input.click();
        input.onchange = (e) => {
            const file_data = input['files'][0];
            const reader = new FileReader();
            reader.readAsText(file_data);
            reader.onload = function () {
                let result = reader.result;
                if (typeof result === "string") {
                    props.convertJsonToState(result);
                }
            };
        }
    };

    const saveInMyComputerHandler = () => {
        props.convertStateToJson();
    };

    const exportHandler = () => {
        const PM = document.getElementById("root");
        if (PM === null) {
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
        <div className={styles["control-panel"]}>
            <input className={styles['fileInput']} id="sortpicture" type="file" />
            <PresentationName />
            <Button onClick={renameHandler} actionName={"Изменить название"} />
            <Button onClick={uploadFromCloudHandler} actionName={"Импортировать из облака"} />
            <Button onClick={uploadFromMyComputerHandler} actionName={"Загрузить с копьютера"} />
            <Button onClick={saveInMyComputerHandler} actionName={"Сохранить на компьютерe"} />
            <Button onClick={exportHandler} actionName={"Экспорт"} />
            <Button onClick={previewHandler} actionName={"Предпросмотр"} />
        </div>
    );
}

export default connector(ControlPanel);