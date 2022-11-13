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
        
        return () => {
            unsubscribe("addSlide", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });
        }
    }, []);

    useEffect(() => {
        subscribe("undo", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });
        
        return () => {
            unsubscribe("undo", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });
        }
    }, []);

    useEffect(() => {
        subscribe("redo", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });
        
        return () => {
            unsubscribe("redo", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });
        }
    }, []);

    useEffect(() => {
        subscribe("text", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });
        
        return () => {
            unsubscribe("text", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });
        }
    }, []);

    useEffect(() => {
        subscribe("elipse", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });
        
        return () => {
            unsubscribe("elipse", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });
        }
    }, []);

    useEffect(() => {
        subscribe("rectangle", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });
        
        return () => {
            unsubscribe("rectangle", () => {
                setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
            });
        }
    }, []);

    useEffect(() => {
        subscribe("triangle", () => {
            setSlideElements(presentationState.curPresentationState.presentationElements.slidesGroup);
        });
        
        return () => {
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