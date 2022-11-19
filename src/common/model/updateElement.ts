import * as types from "../types";
import { getProperty } from "../utils/property";

function updateSlide(currentSlide: types.Slide, properties: Object): types.Slide
{
    return {
        ...currentSlide,
        backgroundColor: ("backgroundColor" in properties 
            ? getProperty(properties, "backgroundColor") as string 
            : null) ?? currentSlide.backgroundColor,
        backgroundImage: ("backgroundImage" in properties 
            ? getProperty(properties, "backgroundImage") as types.ImageInfo 
            : null) ?? currentSlide.backgroundImage,
    }
}

function updateArea(currentArea: types.Area, properties: Object): types.Area
{
    return {
        ...currentArea,
        x: ("x" in properties 
            ? getProperty(properties, "x") as number 
            : null) ?? currentArea.x,
        y: ("y" in properties 
            ? getProperty(properties, "y") as number 
            : null) ?? currentArea.y,
        width: ("width" in properties 
            ? getProperty(properties, "width") as number 
            : null) ?? currentArea.width,
        height: ("height" in properties 
            ? getProperty(properties, "height") as number 
            : null) ?? currentArea.height,
        zIndex: ("zIndex" in properties 
            ? getProperty(properties, "zIndex") as number 
            : null) ?? currentArea.zIndex,
    };
}

export 
{
    updateSlide,
    updateArea,
};