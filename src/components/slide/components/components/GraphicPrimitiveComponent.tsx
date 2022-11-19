import React from "react";
import type * as types from "../../../../common/types";
import TriangleComponent from "./components/TriangleComponent";
import RectangleComponent from "./components/RectangleComponent";
import EllipseComponent from "./components/EllipseComponent";

function GraphicPrimitiveComponent(prop: {areaElement: types.Area}): JSX.Element
{
    const style = {

    };

    if (!prop.areaElement.contains || prop.areaElement.contains.type !== 'primitive')
    {
        return <></>;
    }

    return (
        <div className="graphic-primitive" style={style}>
            { prop.areaElement.contains.primitive === 'elipse' && 
                <EllipseComponent 
                    graphicPrimitiveElement={prop.areaElement.contains} 
                    width={prop.areaElement.width} 
                    height={prop.areaElement.height} 
                /> 
            }

            { prop.areaElement.contains.primitive === 'triangle' && 
                <TriangleComponent 
                    graphicPrimitiveElement={prop.areaElement.contains} 
                    width={prop.areaElement.width} 
                    height={prop.areaElement.height} 
                /> 
            }

            { prop.areaElement.contains.primitive === 'rectangle' && 
                <RectangleComponent 
                    graphicPrimitiveElement={prop.areaElement.contains} 
                    width={prop.areaElement.width} 
                    height={prop.areaElement.height} 
                /> 
            }
        </div>
    );
}

export default GraphicPrimitiveComponent;