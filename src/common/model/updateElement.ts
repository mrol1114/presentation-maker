import * as types from "../types";

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

function getProperty(properties: Object, propertyName: string): unknown
{
    return properties[propertyName as keyof typeof properties];
}

export 
{
    updateSlide,
};