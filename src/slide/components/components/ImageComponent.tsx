import React from "react";
import type * as types from '../../../utils/types';

function ImageComponent(prop: {imageElement: types.ImageInfo}): JSX.Element
{
    return (prop.imageElement.type === "imageUrl" ? <img src={prop.imageElement.path}/> : 
    <img src={"data:image/jpg;base64," + prop.imageElement.base64}/>);
}

export default ImageComponent;