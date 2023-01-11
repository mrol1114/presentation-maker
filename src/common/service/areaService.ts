const areaBorderWidth: number = 10;
const standartDivider: number = 9;

function getWidth(width: number): number {
    return width + areaBorderWidth * 2;
}

function getHeight(height: number): number {
    return height + areaBorderWidth * 2;
}

function getDividerX(workboardSlide: Element, slideRef: HTMLDivElement|null): number {
    return workboardSlide && slideRef ? 
        workboardSlide.clientWidth / slideRef.offsetWidth : standartDivider;
}

function getDividerY(workboardSlide: Element, slideRef: HTMLDivElement|null): number {
    return workboardSlide && slideRef ? 
        workboardSlide.clientHeight / slideRef.offsetHeight : standartDivider;
}

export default {
    getWidth,
    getHeight,
    getDividerX,
    getDividerY,
}