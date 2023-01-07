import React from "react";
import GraphicPrimitiveComponent from "./components/GraphicPrimitiveComponent";
import TextComponent from "./components/TextComponent";
import ImageComponent from "./components/ImageComponent";
import type * as types from "../../../../common/types";
import areaStyles from "./area.module.css";
import * as areaActions from "../../../../actions/areas/areasActions";
import { connect, ConnectedProps } from "react-redux";
import useArea from "./useArea";

const mapDispatch = {
    selectAreas: areaActions.selectAreas,
    assignAreaIndex: areaActions.assignAreaIndex,
    updateArea: areaActions.updateArea,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    areaElement: types.Area, 
    areaIndex: number,
    isCurrentSlide: boolean,
    slideRef: HTMLDivElement|null,
    isControl: boolean
};

function Area(props: Props): JSX.Element
{
    const areaBorderWidth: number = 10;
    const standartDivider: number = 9;

    const workboardSlide: Element = document.querySelectorAll("#workboard-slide")[0];
    const xDivider: number = workboardSlide && props.slideRef ? 
        workboardSlide.clientWidth / props.slideRef.offsetWidth : standartDivider;

    const yDivider: number = workboardSlide && props.slideRef ? 
        workboardSlide.clientHeight / props.slideRef.offsetHeight : standartDivider;

    const style = {
        marginLeft: props.isCurrentSlide ? props.areaElement.x : props.areaElement.x / xDivider,
        marginTop: props.isCurrentSlide ? props.areaElement.y : props.areaElement.y / yDivider,
        width: props.areaElement.width + areaBorderWidth * 2,
        height: props.areaElement.height + areaBorderWidth * 2,
    };

    useArea(props);

    return (
        <div id={props.areaElement.id} style={style}
        className={props.isCurrentSlide ? areaStyles["area-wrapper"] : areaStyles["area-wrapper-scale"]}>
            { props.areaElement.contains?.type === "text" && 
                <TextComponent textElement={props.areaElement.contains}/>
            }

            { props.areaElement.contains?.type === "primitive" && 
                <GraphicPrimitiveComponent areaElement={props.areaElement}/>
            }

            { (props.areaElement.contains?.type === "imageUrl" || props.areaElement.contains?.type === "imageBase64") && 
                <ImageComponent imageElement={props.areaElement.contains}/>
            }
        </div>
    );
}

export default connector(Area);