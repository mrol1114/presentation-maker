import { useRef } from "react"

function useWorkboardSlideRef() {
    const ref = useRef<HTMLDivElement>(null);
    
    return ref;
}

export {
    useWorkboardSlideRef,
}