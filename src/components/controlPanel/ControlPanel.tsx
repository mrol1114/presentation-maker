import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
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

    const [popUpName, setPopUpName] = useState("");

    const [openPicker, authResponse] = useDrivePicker();
    const [isPopUp, setIsPopUp] = useState(false);

    const apiKey = "AIzaSyDBGK9XKGSKosooSCc6AYt0utHt1XN3-vc";
    const clientID = "1030468714467-op9s4o29m260crer5tu3n97kngv1co6i.apps.googleusercontent.com";
    const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    const scopes = "https://www.googleapis.com/auth/drive";

    const handleClientLoad = () => {
        gapi.load("client:auth2", initClient);
    }

    const initClient = () => {
        gapi.client.init({
            apiKey: apiKey,
            clientId: clientID,
            discoveryDocs: discoveryDocs,
            scope: scopes
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const openGooglePicker = () => {
        const maxSizeBytes = 94371840;
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
            callbackFunction: (data) => {
                const doc = data.docs[0];

                if (!data.docs || doc.uploadState) return;

                if (doc.mimeType !== "application/json" || doc.sizeBytes > maxSizeBytes)
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
                    setIsPopUp(false);
                    console.log(error);
                });
            },
        });
    };

    const importFromCloudHandler = () => {
        handleClientLoad();
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

    const changeTextAreasToDivs = (clonedDoc: Document) => {
        const textAreas = clonedDoc.getElementsByTagName("textarea");

        let isTextAreaExist = false;
        for (let i = 0; i < textAreas.length; i++) {
            isTextAreaExist = true;

            const textArea = textAreas[i];

            const div = document.createElement("div");

            div.setAttribute("class", textArea.getAttribute("class") as string);
            div.setAttribute("style", textArea.getAttribute("style") as string);

            div.innerHTML = textArea.innerHTML;

            textArea.replaceWith(div);
        }

        if (isTextAreaExist)
        {
            changeTextAreasToDivs(clonedDoc);
        }
    }

    async function savePdf(prev: string) {
        const workboardSlide = document.getElementById("workboard-slide");

        if (!workboardSlide) return;

        let slidesContentArr = [...slidesContent.slice(1), prev];

        await html2canvas(workboardSlide, {
            useCORS: true, 
            allowTaint: true,
            onclone: (clonedDoc) => {
                changeTextAreasToDivs(clonedDoc);
            }
        }).then(canvas => {
            if (slidesContentArr.length <= 1) return;

            const contentDataURL = canvas.toDataURL("image/jpeg");

            slidesContentArr = [...slidesContentArr, contentDataURL];
        });

        const pdf = new jsPDF("l", "px", "a4");
        const title: string = props.title !== "" ? props.title : "presentation_maker";

        const imgProps = pdf.getImageProperties(slidesContentArr[0]);
        const width: number = pdf.internal.pageSize.getWidth();
        const height: number = (imgProps.height * width) / imgProps.width;

        const positionY: number = (pdf.internal.pageSize.getHeight() - height) / 2;

        slidesContentArr.map((slideContent, index) => {
            pdf.addImage(slideContent, "JPEG", 0, positionY, width, height);

            index === slidesContentArr.length - 1 ? pdf.save(title) : pdf.addPage();
        });

        setIsPopUp(false);
    }

    useEffect(() => {
        const workboardSlide = document.getElementById("workboard-slide");
        if (!isPdf || !workboardSlide) return;

        html2canvas(workboardSlide, {
            useCORS: true,
            allowTaint: true,
            onclone: (clonedDoc) => {
                changeTextAreasToDivs(clonedDoc);
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