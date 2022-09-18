type presentationMaker = {
    localHistory: [],
    slidesGroup: slidesGroup,
}

type slidesGroup = {
    slides: slide[],
    selectedId: number,
}

type slide = {
    id: number,
    areas: area[],
    backgroundColor: color,
    backgroundImage: string,
    slideWidth: number,
    slideHeight: number,
}

type area = {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    zIndex: number,
    contains: areaContent,
}

type text = {
    color: color,
    borderColor: color,
    font: number,
    weight: number,
}

type image = {
    path: string,
}

type graphicPrimitive = {
    color: color,
    borderColor: color,
    primitive: primitive,
}

type areaContent =
    text |
    image |
    graphicPrimitive

type primitive =
    'circle' |
    'triangle' |
    'rectangle'

type color =
    'white' |
    'gray' |
    'black' |
    'yellow' |
    'orange' |
    'blue' |
    'cyan' |
    'red' |
    'pink' |
    'green' |
    'brown' |
    'golden' |
    'silver'