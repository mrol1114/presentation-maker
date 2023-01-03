import React from "react";
import type * as types from "../../../../common/types";
import TriangleComponent from "./components/TriangleComponent";
import RectangleComponent from "./components/RectangleComponent";
import EllipseComponent from "./components/EllipseComponent";
import styles from "./styles.module.css";

function GraphicPrimitiveComponent(props: {areaElement: types.Area}): JSX.Element
{    
    if (!props.areaElement.contains || props.areaElement.contains.type !== 'primitive')
    {
        return <></>;
    }

    return (
        <div className={styles["graphic-primitive"]}>
            { props.areaElement.contains.primitive === 'ellipse' && 
                <EllipseComponent 
                    graphicPrimitiveElement={props.areaElement.contains} width={props.areaElement.width} height={props.areaElement.height}
                /> 
            }

            { props.areaElement.contains.primitive === 'triangle' && 
                <TriangleComponent 
                    graphicPrimitiveElement={props.areaElement.contains}
                /> 
            }

            { props.areaElement.contains.primitive === 'rectangle' && 
                <RectangleComponent 
                    graphicPrimitiveElement={props.areaElement.contains} width={props.areaElement.width} height={props.areaElement.height}
                /> 
            }
        </div>
    );
}

export default GraphicPrimitiveComponent;