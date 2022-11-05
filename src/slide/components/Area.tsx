import React from "react";
import GraphicPrimitiveComponent from "./components/GraphicPrimitiveComponent";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import type * as types from "../../utils/types";

function Area(prop: {areaElement: types.Area}): JSX.Element
{
    if (!prop.areaElement.contains)
    {
        return(<></>);
    }

    const style = {

    };

    return (
        <div className="area-wrapper" style={style}>
            { prop.areaElement.contains.type === "text" && 
                <TextComponent textElement={prop.areaElement.contains}/>
            }

            { prop.areaElement.contains.type === "primitive" && 
                <GraphicPrimitiveComponent graphicPrimitiveElement={prop.areaElement.contains}/>
            }

            { (prop.areaElement.contains.type === "imageUrl" || prop.areaElement.contains.type === "imageBase64") && 
                <ImageComponent imageElement={prop.areaElement.contains}/>
            }
        </div>
    );
}

export default Area;