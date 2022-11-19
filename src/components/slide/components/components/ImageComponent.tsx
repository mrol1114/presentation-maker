import React from "react";
import type * as types from '../../../../common/types';

function ImageComponent(prop: {imageElement: types.ImageInfo}): JSX.Element
{
    return (prop.imageElement.type === "imageUrl" ? <img src={prop.imageElement.path} alt={"картинка"}/> :
    <img src={"data:image/jpg;base64," + prop.imageElement.base64} alt={"картинка"}/>);
}

export default ImageComponent;