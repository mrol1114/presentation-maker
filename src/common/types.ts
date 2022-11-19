type PresentationMaker = {
    name: string,
    localHistory: PresentationElements[],
    presentationElements: PresentationElements,
    currentPresentationElementsIndex: number
}

type PresentationElements = {
    slidesGroup: Slide[],
    currentSlideIndex: number,
    selectedSlidesIndexes: number[],
    selectedAreasIndexes: number[],
    currentAreaIndex: number,
}

type Slide = {
    id: string,
    areas: Area[],
    backgroundColor: string,
    backgroundImage: ImageInfo,
}

type Area = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    zIndex: number,
    contains: AreaContent|undefined,
}

type TextInfo = {
    type: 'text',
    color: string,
    borderColor: string,
    fontSize: number,
    font: string,
    weight: number,
    text: string,
}

type UpdatedTextInfo = {
    color: string|undefined,
    borderColor: string|undefined,
    fontSize: number|undefined,
    font: string|undefined,
    weight: number|undefined,
    text: string|undefined,
}

type ImageBase64 = {
    type: "imageBase64",
    base64: string,
}

type ImageUrl = {
    type: "imageUrl",
    path: string,
}

type ImageInfo = ImageBase64 | ImageUrl

type GraphicPrimitiveInfo = {
    type: 'primitive',
    color: string,
    strokeColor: string,
    strokeWidth: number,
    primitive: Primitive,
}

type UpdatedGraphicPrimitiveInfo = {
    color: string|undefined,
    strokeColor: string|undefined,
    strokeWidth: number|undefined,
    primitive: Primitive|undefined,
}

type AreaContent =
    TextInfo |
    ImageInfo |
    GraphicPrimitiveInfo

type Primitive =
    "ellipse" |
    "triangle" |
    "rectangle"

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

export type {
    PresentationMaker,
    PresentationElements,
    Slide,
    Area,
    TextInfo,
    UpdatedTextInfo,
    ImageBase64,
    ImageUrl,
    ImageInfo,
    GraphicPrimitiveInfo,
    UpdatedGraphicPrimitiveInfo,
    AreaContent,
    Primitive
};