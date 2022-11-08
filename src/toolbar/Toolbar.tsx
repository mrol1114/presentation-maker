import React from "react";
import AddSlideButtonComponent from "./components/AddSlideButtonComponent";
import UndoComponent from "./components/UndoButtonComponent";
import RedoComponent from "./components/RedoButtonComponent";
import BackgroundImageButtonComponent from "./components/BackgroundImageButtonComponent";
import BackgroundColorButtonComponent from "./components/BackgroundColorButtonComponent";
import TextButtonComponent from "./components/TextButtonComponent";
import ImageButtonComponent from "./components/ImageButtonComponent";
import RectangleButtonComponent from "./components/RectangleButtonComponent";
import TriangleButtonComponent from "./components/TriangleButtonComponent";
import EllipseButtonComponent from "./components/EllipseButtonComponent";

function Toolbar(): JSX.Element
{
    return (
        <div className="toolbar">
            <AddSlideButtonComponent/>
            <UndoComponent/>
            <RedoComponent/>
            <BackgroundImageButtonComponent/>
            <BackgroundColorButtonComponent/>
            <TextButtonComponent/>
            <ImageButtonComponent/>
            <RectangleButtonComponent/>
            <TriangleButtonComponent/>
            <EllipseButtonComponent/>
        </div>
    );
}

export default Toolbar;