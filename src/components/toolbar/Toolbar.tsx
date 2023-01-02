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

    useEffect(() => {
        setIsText(false);
        setIsGraphicPrimitive(false);

        if (prop.presentationElements.slidesGroup.length && currAreaIndex !== -1 && 
            prop.presentationElements.slidesGroup[currSlideIndex].areas.length)
        {
            const areaContainsType = prop.presentationElements.slidesGroup[currSlideIndex].areas[currAreaIndex].contains?.type;

            if (areaContainsType === "text") setIsText(true);
            else if (areaContainsType === "primitive") setIsGraphicPrimitive(true);
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
        
    }

    const increaseFontSizeHandler = () =>
    {
        
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

    const changeTextStrokeColorHandler = () =>
    {

    }

    const changeGraphicPrimitiveStrokeColorHandler = () =>
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
                <InputComponent additionalClass={toolbarStyles["text-font"]} value="Arial" />
                <Button additionalClass={toolbarStyles["font"] + " " + toolbarStyles["icon"]}
                    onClick={changeTextFontHandler} />
                <Button additionalClass={toolbarStyles["increase-font-size"] + " " + toolbarStyles["icon"]}
                    onClick={increaseFontSizeHandler} />
                <InputComponent additionalClass={toolbarStyles["text-font-size"]} value={0} />
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
                <StrokeWidth value={0} type={"text"} />
            </div>
            <div className={isGraphicPrimitive ? toolbarStyles["toolbar__graphic-primitive-active"] : 
            toolbarStyles["toolbar__graphic-primitive-inactive"]}>
                <ColorSelector type="primitive" styleName="primitive-color-button" />
                <ColorSelector type="primitiveStroke" styleName="primitive-stroke-color-button" />
                <StrokeWidth value={0} type={"primitive"} />
            </div>
        </div>
    );
}

export default Toolbar;