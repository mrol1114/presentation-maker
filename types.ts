type PresentationMaker = {
    localHistory: SlidesGroup[],
    slidesGroup: SlidesGroup,
    name: string
}

type SlidesGroup = {
    slides: Slide[],
    currentId: number,
    selectedIds: number[],
}

type Slide = {
    id: number,
    areas: Area[],
    selectedAreaIds: number[],
    currentAreaId: number[],
    backgroundColor: Color,
    backgroundImage: string,
    slideWidth: number,
    slideHeight: number,
}

type Area = {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    zIndex: number,
    contains: AreaContent,
}

type TextContent = {
    type: 'text',
    color: Color,
    borderColor: Color,
    fontSize: number,
    font: string,
    weight: number,
}

type Image = {
    type: 'image',
    path: string,
}

type GraphicPrimitive = {
    type: 'primitive',
    color: Color,
    borderColor: Color,
    primitive: Primitive,
}

type AreaContent =
    TextContent |
    Image |
    GraphicPrimitive

type Primitive =
    'circle' |
    'triangle' |
    'rectangle'

type Color =
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

type SaveObj = {
    content: Content,
    place: Place 
}

type Content = 
    Pdf |
    Json

type Place = 
    'dropbox' |
    'google'