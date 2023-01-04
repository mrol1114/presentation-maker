import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import ImageSelector from "./components/ImageSelector";
import StrokeWidth from "./components/StrokeWidth";
import { dispatch } from "../../actions/actions";
import * as functions from "../../common/functions";
import toolbarStyles from "./toolbar.module.css";
import InputComponent from "./components/InputComponent";
import * as types from "../../common/types";
import ColorSelector from "./components/ColorSelector";


function Toolbar(prop: {presentationElements: types.PresentationElements}): JSX.Element
{
    const currSlideIndex: number = prop.presentationElements.currentSlideIndex;
    const currAreaIndex: number = prop.presentationElements.currentAreaIndex;

    const [isText, setIsText] = useState(false);
    const [isGraphicPrimitive, setIsGraphicPrimitive] = useState(false);
    const [isBackgroundImage, setIsBackgroundImage] = useState(false);

    const [primitiveStrokeWidth, setPrimitiveStrokeWidth] = useState(0);
    const [textStrokeWidth, setTextStrokeWidth] = useState(0);
    const [textFontSize, setTextFontSize] = useState(0);
    const [textFont, setTextFont] = useState("");

    useEffect(() => {
        setIsText(false);
        setIsGraphicPrimitive(false);

        if (prop.presentationElements.slidesGroup.length && currAreaIndex !== -1 && 
            prop.presentationElements.slidesGroup[currSlideIndex].areas.length)
        {
            const currArea: types.Area = prop.presentationElements.slidesGroup[currSlideIndex].areas[currAreaIndex]; 
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
    });
    
    const addSlideHandler = () => 
    {
        dispatch(functions.addSlide, {});
    }

    const undoHandler = () => 
    {
        dispatch(functions.undo, {});
    }

    const redoHandler = () => 
    {
        dispatch(functions.redo, {});
    }

    const backgroundImageHandler = () => 
    {
        const selector = document.getElementById("image-selector");
        selector?.classList.add(toolbarStyles["selector-active"]);
        setIsBackgroundImage(true);
    }

    const addTextHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "text"});
    }

    const openImageSelectorHandler = () => 
    {
        const selector = document.getElementById("image-selector");
        selector?.classList.add(toolbarStyles["selector-active"]);
        setIsBackgroundImage(false);
    }

    const addElipseHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "primitive", primitiveType: "ellipse"});
    }

    const addRectangleHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "primitive", primitiveType: "rectangle"});
    }

    const addTriangleHandler = () => 
    {
        dispatch(functions.addArea, {areaType: "primitive", primitiveType: "triangle"});
    }

    const changeTextFontHandler = () =>
    {

    }

    const reduceFontSizeHandler = () =>
    {
        const area = prop.presentationElements.slidesGroup[currSlideIndex].areas[currAreaIndex];

        if (!area.contains || area.contains?.type !== "text")
        {
            return;
        }

        dispatch(functions.updateText, {fontSize: area.contains.fontSize + 1});
    }

    const increaseFontSizeHandler = () =>
    {
        const area = prop.presentationElements.slidesGroup[currSlideIndex].areas[currAreaIndex];

        if (!area.contains || area.contains?.type !== "text" || area.contains.fontSize - 1 < 0)
        {
            return;
        }

        dispatch(functions.updateText, {fontSize: area.contains.fontSize - 1});
    }

    const textBoldHandler = () =>
    {

    }

    const textItalicHandler = () =>
    {
        
    }

    const textUnderlinedHandler = () =>
    {
        
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
                    onClick={changeTextFontHandler} />
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

export default Toolbar;