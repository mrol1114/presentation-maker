import React, { useEffect, useState } from "react";
import { presentationState } from "../utils/consts";
import Slide from "../slide/Slide";
import { subscribe, unsubscribe } from "../common/event";
import type * as types from "../utils/types";

function SlidesGroup(): JSX.Element
{
    const [slideElements, setSlideElements] = useState(presentationState.curPresentationState.presentationElements.slidesGroup);

    useEffect(() => {
        subscribe("addSlide", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });

        subscribe("undo", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });

        subscribe("redo", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });

        subscribe("text", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });

        subscribe("elipse", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });

        subscribe("rectangle", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });

        subscribe("triangle", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });
        
        return () => {
            unsubscribe("addSlide", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });

            unsubscribe("undo", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });

            unsubscribe("redo", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });

            unsubscribe("text", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });

            unsubscribe("elipse", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });

            unsubscribe("rectangle", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });

            unsubscribe("triangle", () => {
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