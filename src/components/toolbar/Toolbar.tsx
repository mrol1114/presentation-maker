import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import ImageSelector from "./components/ImageSelector";
import StrokeWidth from "./components/StrokeWidth";
import toolbarStyles from "./toolbar.module.css";
import InputComponent from "./components/InputComponent";
import * as types from "../../common/types";
import ColorSelector from "./components/ColorSelector";
import TextFont from "./components/TextFont";
import { undo, redo } from "../../actions/local-history/localHistoryActions";
import { addSlide } from "../../actions/slides/slidesActions";
import { addArea } from "../../actions/areas/areasActions";
import { updateText } from "../../actions/area-content/areaContentActions";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "../../store";

const mapState = (state: RootState) => ({
    currSlideIndex: state.presentationElements.currentSlideIndex,
    currAreaIndex: state.presentationElements.currentAreaIndex,
    slidesGroup: state.presentationElements.slidesGroup,
});

const mapDispatch = {
    addSlide: addSlide,
    undo: undo,
    redo: redo,
    addArea: addArea,
    updateText: updateText,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function Toolbar(props: Props): JSX.Element
{
    const [isText, setIsText] = useState(false);
    const [isGraphicPrimitive, setIsGraphicPrimitive] = useState(false);
    const [isBackgroundImage, setIsBackgroundImage] = useState(false);

    const [primitiveStrokeWidth, setPrimitiveStrokeWidth] = useState(0);
    const [textStrokeWidth, setTextStrokeWidth] = useState(0);
    const [textFontSize, setTextFontSize] = useState(0);
    const [textFont, setTextFont] = useState("");

    const [menuIsHidden, setMenuIsHidden] = useState(true);

    useEffect(() => {
        setIsText(false);
        setIsGraphicPrimitive(false);

        if (props.slidesGroup.length && props.currAreaIndex !== -1 && 
            props.slidesGroup[props.currSlideIndex].areas.length)
        {
            const currArea: types.Area = props.slidesGroup[props.currSlideIndex].areas[props.currAreaIndex]; 
            const areaContainsType = currArea.contains?.type;

            if (areaContainsType === "text")
            {
                setIsText(true);
                setTextStrokeWidth(currArea.contains ? currArea.contains.strokeWidth : 0);
                setTextFontSize(currArea.contains ? currArea.contains.fontSize : 0);
                setTextFont(currArea.contains ? currArea.contains.font : "Arial");
            }
            else if (areaContainsType === "primitive")
            {
                setIsGraphicPrimitive(true);
                setPrimitiveStrokeWidth(currArea.contains?.strokeWidth ? currArea.contains?.strokeWidth : 0);
            }
        }

        const mouseDownHandler = (e) => {
            if (e.target.id !== "font-menu")
            {
                setMenuIsHidden(true);
            }
        }

        const workboard = document.querySelectorAll("#workboard")[0];
        workboard.addEventListener("mousedown", mouseDownHandler);

        return () => {
            workboard.removeEventListener("mousedown", mouseDownHandler);
        }
    });
    
    const addSlideHandler = () => 
    {
        props.addSlide();
    }

    const undoHandler = () => 
    {
        props.undo();
    }

    const redoHandler = () => 
    {
        props.redo();
    }

    const backgroundImageHandler = () => 
    {
        const selector = document.getElementById("image-selector");
        selector?.classList.add(toolbarStyles["selector-active"]);
        setIsBackgroundImage(true);
    }

    const addTextHandler = () => 
    {
        props.addArea({areaType: "text"});
    }

    const openImageSelectorHandler = () => 
    {
        const selector = document.getElementById("image-selector");
        selector?.classList.add(toolbarStyles["selector-active"]);
        setIsBackgroundImage(false);
    }

    const addElipseHandler = () => 
    {
        props.addArea({areaType: "primitive", primitiveType: "ellipse"});
    }

    const addRectangleHandler = () => 
    {
        props.addArea({areaType: "primitive", primitiveType: "rectangle"});
    }

    const addTriangleHandler = () => 
    {
        props.addArea({areaType: "primitive", primitiveType: "triangle"});
    }

    const textFontButtonHandler = () =>
    {
        setMenuIsHidden(!menuIsHidden);
    }

    const reduceFontSizeHandler = () =>
    {
        const area = props.slidesGroup[props.currSlideIndex].areas[props.currAreaIndex];

        if (!area.contains || area.contains?.type !== "text")
        {
            return;
        }

        props.updateText({fontSize: area.contains.fontSize + 1});
    }

    const increaseFontSizeHandler = () =>
    {
        const area = props.slidesGroup[props.currSlideIndex].areas[props.currAreaIndex];

        if (!area.contains || area.contains?.type !== "text" || area.contains.fontSize - 1 < 0)
        {
            return;
        }

        props.updateText({fontSize: area.contains.fontSize - 1});
    }

    const textBoldHandler = () =>
    {
        const area = props.slidesGroup[props.currSlideIndex].areas[props.currAreaIndex];

        if (!area.contains || area.contains?.type !== "text")
        {
            return;
        }

        props.updateText({bold: !area.contains.bold});
    }

    const textItalicHandler = () =>
    {
        const area = props.slidesGroup[props.currSlideIndex].areas[props.currAreaIndex];

        if (!area.contains || area.contains?.type !== "text")
        {
            return;
        }

        props.updateText({italic: !area.contains.italic});
    }

    const textUnderlinedHandler = () =>
    {
        const area = props.slidesGroup[props.currSlideIndex].areas[props.currAreaIndex];

        if (!area.contains || area.contains?.type !== "text")
        {
            return;
        }

        props.updateText({underlined: !area.contains.underlined});
    }

    return (
        <div className={toolbarStyles["toolbar"]}>
            <div className={toolbarStyles["toolbar__slide-tools"]}>
                <Button additionalClass={toolbarStyles["add-slide"] + " " + toolbarStyles["icon"]}
                    onClick={addSlideHandler} />
                <Button additionalClass={toolbarStyles["undo"] + " " + toolbarStyles["icon"]}
                    onClick={undoHandler} />
                <Button additionalClass={toolbarStyles["redo"] + " " + toolbarStyles["icon"]}
                    onClick={redoHandler} />
                <Button additionalClass={toolbarStyles["background-image"] + " " + toolbarStyles["icon"]}
                    onClick={backgroundImageHandler} />
                <ColorSelector type="background" styleName="background-color-button" />
                <Button additionalClass={toolbarStyles["text"] + " " + toolbarStyles["icon"]}
                    onClick={addTextHandler} />
                <Button additionalClass={toolbarStyles["image"] + " " + toolbarStyles["icon"]}
                    onClick={openImageSelectorHandler} />
                <ImageSelector isBackgroundImageSelector={isBackgroundImage} />
                <Button additionalClass={toolbarStyles["elipse"] + " " + toolbarStyles["icon"]}
                    onClick={addElipseHandler} />
                <Button additionalClass={toolbarStyles["rectangle"] + " " + toolbarStyles["icon"]}
                    onClick={addRectangleHandler} />
                <Button additionalClass={toolbarStyles["triangle"] + " " + toolbarStyles["icon"]}
                    onClick={addTriangleHandler} />
            </div>
            <div className={isText ? toolbarStyles["toolbar__text-tools-active"] : 
            toolbarStyles["toolbar__text-tools-inactive"]}>
                <InputComponent additionalClass={toolbarStyles["text-font"]} value={textFont} />
                <Button additionalClass={toolbarStyles["font"] + " " + toolbarStyles["icon"]}
                    onClick={textFontButtonHandler} />
                <TextFont isHidden={menuIsHidden} textFont={textFont} />
                <Button additionalClass={toolbarStyles["increase-font-size"] + " " + toolbarStyles["icon"]}
                    onClick={increaseFontSizeHandler} />
                <InputComponent additionalClass={toolbarStyles["text-font-size"]} value={textFontSize} />
                <Button additionalClass={toolbarStyles["reduce-font-size"] + " " + toolbarStyles["icon"]}
                    onClick={reduceFontSizeHandler} />
                <ColorSelector type="text" styleName="text-color-button" />
                <Button additionalClass={toolbarStyles["bold"] + " " + toolbarStyles["icon"]}
                    onClick={textBoldHandler} />
                <Button additionalClass={toolbarStyles["italic"] + " " + toolbarStyles["icon"]}
                    onClick={textItalicHandler} />
                <Button additionalClass={toolbarStyles["underlined"] + " " + toolbarStyles["icon"]}
                    onClick={textUnderlinedHandler} />
                <ColorSelector type="textStroke" styleName="text-stroke-color-button" />
                <StrokeWidth value={textStrokeWidth} type={"text"} />
            </div>
            <div className={isGraphicPrimitive ? toolbarStyles["toolbar__graphic-primitive-active"] : 
            toolbarStyles["toolbar__graphic-primitive-inactive"]}>
                <ColorSelector type="primitive" styleName="primitive-color-button" />
                <ColorSelector type="primitiveStroke" styleName="primitive-stroke-color-button" />
                <StrokeWidth value={primitiveStrokeWidth} type={"primitive"} />
            </div>
        </div>
    );
}

export default connector(Toolbar);