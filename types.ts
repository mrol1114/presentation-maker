type PresentationMaker = {
    localHistory: SlidesGroup[],
    slidesGroup: SlidesGroup,
    name: string,
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
    currentAreaId: number,
    backgroundColor: Color,
    backgroundImage: ImageInfo,
    width: number,
    height: number,
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

type TextInfo = {
    type: 'text',
    color: Color,
    borderColor: Color,
    fontSize: number,
    font: string,
    weight: number,
    text: string,
}

type ImageInfo = {
    type: 'image',
    path: string,
    image64: string,
}

type GraphicPrimitiveInfo = {
    type: 'primitive',
    color: Color,
    borderColor: Color,
    primitive: Primitive,
}

type AreaContent =
    TextInfo |
    ImageInfo |
    GraphicPrimitiveInfo

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

type Pdf = {

}

type Content = 
    Pdf |
    JSON

type Place = 
    'dropbox' |
    'google'