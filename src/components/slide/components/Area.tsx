import React from "react";
import GraphicPrimitiveComponent from "./components/GraphicPrimitiveComponent";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import type * as types from "../../../common/types";
import styles from "./styles.module.css";

function Area(prop: {areaElement: types.Area}): JSX.Element
{
    if (!prop.areaElement.contains)
    {
        return(<></>);
    }

    const style = {
        marginLeft: prop.areaElement.x,
        marginTop: prop.areaElement.y,
        width: prop.areaElement.width + 10,
        height: prop.areaElement.height + 10,
    };

    return (
        <div className={styles["area-wrapper"]} style={style}>
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