import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Button from "./components/Button";
import PresentationName from "./components/PresentationName";
import styles from "./styles.module.css";
import { convertJsonToState, convertStateToJson } from "../../actions/convert/convertActions";
import { connect, ConnectedProps } from "react-redux";
import { changeTitle } from "../../actions/title/titleActions";
import useDrivePicker from "react-google-drive-picker/dist";
import { getJSDocTemplateTag } from "typescript";
import { gapi } from 'gapi-script';

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

    const apiKey = "AIzaSyDBGK9XKGSKosooSCc6AYt0utHt1XN3-vc";
    const clientID = "1030468714467-op9s4o29m260crer5tu3n97kngv1co6i.apps.googleusercontent.com";
    const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    const scopes = "https://www.googleapis.com/auth/drive";

    function handleClientLoad() {
        gapi.load("client:auth2", initClient);
    }

    function initClient() {
        gapi.client.init({
            apiKey: apiKey,
            clientId: clientID,
            discoveryDocs: discoveryDocs,
            scope: scopes
        }).then(function () {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }, function (error) {
            console.log(error);
        });
    }

    function updateSigninStatus(isSignedIn: boolean) {
        /* from pop-up buttons signIn/signOut
        if (isSignedIn) {
            
        }*/
    }

    function openGooglePicker() {
        const token = gapi.auth.getToken();

        openPicker({
            clientId: clientID,
            developerKey: apiKey,
            viewId: "DOCS",
            token: token ? token.access_token : "",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            // customViews: customViewsArray,
            callbackFunction: (data) => {
                if (!data.docs) return;

                const doc = data.docs[0];

                gapi.client.drive.files.get({
                    headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
                    fileId: doc.id,
                    alt: "media"
                })
                .then(function(res) {
                    props.convertJsonToState(res.result as string);
                })
                .catch(function(error) {
                    console.log(error);
                })
            },
        })
    }

    const renameHandler = () => {
        const newTitle = document.getElementsByTagName("input")[1].value;

        if (newTitle) {
            props.changeTitle(newTitle);
        }
    };

    const importFromCloudHandler = () => {
        handleClientLoad();
        openGooglePicker();
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
        const PM = document.getElementById("workboard");
        if (PM === null) {
            return;
        }
        const doc = new jsPDF({
            orientation: "landscape",
            format: 'a4',
            unit: 'px',
        });
        let div = document.createElement("div");
        const width = doc.internal.pageSize.getWidth() - 0.5;
        const height = doc.internal.pageSize.getHeight() - 0.5;
        PM.style.padding = "0";
        PM.style.border = "none";

        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.display = "flex";
        div.appendChild(PM);

        console.log(div);
        doc.setFont('Inter-Regular', 'normal');
        doc.html(div, {
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
            <Button onClick={importFromCloudHandler} actionName={"Импортировать из облака"} />
            <Button onClick={uploadFromMyComputerHandler} actionName={"Загрузить с копьютера"} />
            <Button onClick={saveInMyComputerHandler} actionName={"Сохранить на компьютерe"} />
            <Button onClick={exportHandler} actionName={"Экспорт"} />
            <Button onClick={previewHandler} actionName={"Предпросмотр"} />
        </div>
    );
}

export default connector(ControlPanel);