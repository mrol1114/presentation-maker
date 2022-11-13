import React, { useEffect, useState } from "react";
import { presentationState } from "../utils/consts";
import Slide from "../slide/Slide";
import { subscribe, unsubscribe } from "../common/event";
import type * as types from "../utils/types";

function SlidesGroup(): JSX.Element
{
    const [slideElements, setSlideElements] = useState(presentationState.curPresentationState.presentationElements.slidesGroup);

    useEffect(() => {
        subscribe("add", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });
        
        return () => {
            unsubscribe("add", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });
        }
    }, []);
    
    return (
        <ul className="slides-group">
            {
                slideElements.map((slideElement: types.Slide, index: number) => {
                    return (
                        <li key={slideElement.id}>
                            <Slide slideIndex={index} />
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default SlidesGroup;