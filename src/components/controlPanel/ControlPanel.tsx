import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import PresentationName from "./components/PresentationName";
import ControlPanelStyles from "./controlPanel.module.css";
import { convertJsonToState, convertStateToJson } from "../../actions/convert/convertActions";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "../../store";
import { changeTitle } from "../../actions/title/titleActions";
import useDrivePicker from "react-google-drive-picker/dist";
import html2canvas from "html2canvas";
import { gapi } from 'gapi-script';
import WaitingPopUp from "../waitingPopUp/WaitingPopUp";
import { assignSlideIndex } from "../../actions/slides/slidesActions";
import ControlPanelService from "../../common/service/controlPanelService";

const mapDispatch = {
    convertJsonToState: (jsonString: string) => convertJsonToState(jsonString),
    convertStateToJson: convertStateToJson,
    changeTitle: changeTitle,
    assignSlideIndex: assignSlideIndex
};

const mapState = (state: RootState) => ({
    title: state.title,
    slidesGroup: state.presentationElements.slidesGroup,
    currSlideIndex: state.presentationElements.currentSlideIndex
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function ControlPanel(props: Props): JSX.Element {
    const [slidesContent, setSlidesContent] = useState(Array<string>);
    const [isPdf, setIsPdf] = useState(false);

    const [openPicker, authResponse] = useDrivePicker();

    const [isPopUp, setIsPopUp] = useState(false);
    const [popUpName, setPopUpName] = useState("");

    const openGooglePicker = () => {
        const token = gapi.auth.getToken();

        openPicker({
            clientId: ControlPanelService.clientID,
            developerKey: ControlPanelService.apiKey,
            viewId: "DOCS",
            token: token ? token.access_token : "",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            callbackFunction: (data) => {
                const doc = data.docs[0];

                if (!data.docs || doc.uploadState) return;

                if (doc.mimeType !== "application/json" || 
                doc.sizeBytes > ControlPanelService.maxFileSizeBytes)
                {
                    const message: string = doc.mimeType !== "application/json" ? 
                        "Формат файла должен быть json" : "Размер файла слишком большой";

                    setPopUpName(message);
                    setIsPopUp(true);

                    setTimeout(() => {
                        setIsPopUp(false);
                    }, 1800);

                    openGooglePicker();
                    return;
                }

                setPopUpName("Загрузка файла...");
                setIsPopUp(true);

                gapi.client.drive.files.get({
                    headers: new Headers({ 
                        "Authorization": "Bearer " + gapi.auth.getToken().access_token 
                    }),
                    fileId: doc.id,
                    alt: "media"
                })
                .then((res) => {
                    setIsPopUp(false);
                    props.convertJsonToState(res.result as string);
                })
                .catch((error) => {
                    setPopUpName("Произошла ошибка");
                    setTimeout(() => {
                        setIsPopUp(false);
                    }, 1800);
                    console.log(error);
                });
            },
        });
    };

    const importFromCloudHandler = () => {
        ControlPanelService.handleClientLoad();
        openGooglePicker();
    };

    const renameHandler = () => {
        const newTitle = document.getElementsByTagName("input")[1].value;

        if (newTitle) {
            props.changeTitle(newTitle);
        }
    };

    const uploadFromMyComputerHandler = () => {
        const input = document.getElementById("sortpicture");

        if (!input) return;
        
        input.click();
        input.onchange = () => {
            const fileData = input["files"][0];
            const fileReader = new FileReader();

            fileReader.readAsText(fileData);
            fileReader.onload = () => {
                props.convertJsonToState(fileReader.result as string);
            };
        }
    };

    async function savePdf(prev: string) {
        ControlPanelService.savePdf(slidesContent, prev, props.title)

        setIsPopUp(false);
    }

    const exportPdfHandler = () => {
        if (!props.slidesGroup.length) return;
        setSlidesContent([]);

        props.assignSlideIndex(0);
        setIsPdf(true);

        setPopUpName("Идёт создание PDF...");
        setIsPopUp(true);
    };

    const previewHandler = () => {
        if (props.slidesGroup.length) {
            document.documentElement.requestFullscreen();
        }
    };

    useEffect(() => {
        const workboardSlide = document.getElementById("workboard-slide");
        if (!isPdf || !workboardSlide) return;

        html2canvas(workboardSlide, {
            useCORS: true,
            allowTaint: true,
            onclone: (clonedDoc) => {
                ControlPanelService.changeTextAreasToDivs(clonedDoc);
            }
        }).then(canvas => {
            const contentDataURL = canvas.toDataURL("image/jpeg");

            setSlidesContent([...slidesContent, contentDataURL]);

            if (props.currSlideIndex < props.slidesGroup.length - 1) 
            {
                setTimeout(() => {
                    props.assignSlideIndex(props.currSlideIndex + 1);
                }, 0);
            }
            else
            {
                setIsPdf(false);
                savePdf(contentDataURL);
            }
        });
    }, [props.currSlideIndex, isPdf]);

    return (
        <div className={ControlPanelStyles["control-panel"]}>
            <input className={ControlPanelStyles['fileInput']} id="sortpicture" type="file" />
            <PresentationName />
            <Button onClick={renameHandler} actionName={"Изменить название"} />
            <Button onClick={importFromCloudHandler} actionName={"Импортировать из облака"} />
            <Button onClick={uploadFromMyComputerHandler} actionName={"Загрузить с копьютера"} />
            <Button onClick={() => {props.convertStateToJson()}} actionName={"Сохранить на компьютерe"} />
            <Button onClick={exportPdfHandler} actionName={"Экспорт"} />
            <Button onClick={previewHandler} actionName={"Предпросмотр"} />
            <WaitingPopUp isPopUp={isPopUp} name={popUpName} />
        </div>
    );
}

export default connector(ControlPanel);