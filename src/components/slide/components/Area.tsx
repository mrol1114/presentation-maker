import React from "react";
import GraphicPrimitiveComponent from "./components/GraphicPrimitiveComponent";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import style from "./styles.module.css";
import type * as types from "../../../common/types";

function Area(prop: {areaElement: types.Area, isCurrentSlide: boolean}): JSX.Element
{
    if (!prop.areaElement.contains)
    {
        return(<></>);
    }

    return (
        <div className={style["area-wrapper"]}>
            { prop.areaElement.contains.type === "text" && 
                <TextComponent textElement={prop.areaElement.contains}/>
            }

            { prop.areaElement.contains.type === "primitive" && 
                <GraphicPrimitiveComponent areaElement={prop.areaElement}/>
            }

            { (prop.areaElement.contains.type === "imageUrl" || prop.areaElement.contains.type === "imageBase64") && 
                <ImageComponent imageElement={prop.areaElement.contains}/>
            }
        </div>
    );
}

export default Area;