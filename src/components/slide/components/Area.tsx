import React from "react";
import GraphicPrimitiveComponent from "./components/GraphicPrimitiveComponent";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import type * as types from "../../../common/types";
import styles from "./styles.module.css";

function Area(prop: {areaElement: types.Area, isCurrentSlide: boolean}): JSX.Element
{
    if (!prop.areaElement.contains)
    {
        return(<></>);
    }

    const style = {
        marginLeft: prop.isCurrentSlide ? prop.areaElement.x : prop.areaElement.x / 9,
        marginTop: prop.isCurrentSlide ? prop.areaElement.y : prop.areaElement.y / 9,
        width: prop.areaElement.width + 10,
        height: prop.areaElement.height + 10,
    };

    return (
        <div className={prop.isCurrentSlide ? styles["area-wrapper"] : styles["area-wrapper-scale"]} style={style}>
            { prop.areaElement.contains.type === "text" && 
                <TextComponent textElement={prop.areaElement.contains} id={prop.areaElement.id}/>
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