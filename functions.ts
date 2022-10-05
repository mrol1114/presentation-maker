// загрузкы, выгрузка

function download(): PresentationMaker
{

}

function convertPresentationMakerToJson(presentationMaker: PresentationMaker): json
{

}

function convertJsonToPresentationMaker(json: json): PresentationMaker
{

}

function save(obj: saveObj): void
{

}

function convertPdf(PresentationMaker: PresentationMaker): pdf
{

}

// работа с массивом слайдов

function addSlide(presentationMaker: PresentationMaker, newSlide: Slide): PresentationMaker
{
    return {
        [
            ...presentationMaker.localHistory,
            presentationMaker.slidesGroup
        ],
        {
            ...presentationMaker.slidesGroup.slides,
            newSlide
        }
    }
}

function deleteSlide(presentationMaker: PresentationMaker, id: number): PresentationMaker
{

}

function updateSlide(presentationMaker: PresentationMaker, slide: Slide): PresentationMaker
{

}

function selectSlide(presentationMaker: PresentationMaker, id: number): PresentationMaker
{

}

function moveSlide(presentationMaker: PresentationMaker, id: number, position: number): PresentationMaker
{

}

function presentationPrewiev(presentationMaker: PresentationMaker): void
{
    
}

function drawSlidesGroup(presentationMaker: PresentationMaker): void
{

}

// работа с слайдом

function changeBackgroundColorToSlide(presentationMaker: PresentationMaker, backgroundColor: Color, id: number): PresentationMaker
{

}

function changeBackgroundImageToSlide(presentationMaker: PresentationMaker, img: Image, id: number, position: number): PresentationMaker
{

}

function addArea(presentationMaker: PresentationMaker, id: number, content: Area): PresentationMaker
{

}

function deleteArea(presentationMaker: PresentationMaker, idSlide: number, idArea: number): PresentationMaker
{

}

function selectArea(presentationMaker: PresentationMaker, idSlide: number, idArea: number): PresentationMaker
{

}

function drawSlide(slide: Slide): void
{

}

// работа с областью

function moveArea(presentationMaker: PresentationMaker, idSlide: number, idArea: number): PresentationMaker
{

}

function changeZIndexArea(presentationMaker: PresentationMaker, idSlide: number, idArea: number, zIndex: number): PresentationMaker
{

}

function updateArea(presentationMaker: PresentationMaker, area: Area, idSlide: number, idArea: number): PresentationMaker
{

}

function drawArea(area: Area): PresentationMaker
{

}

// работа с текстом

function updateText(prevText: Text, newText: Text): PresentationMaker
{

}

function createText(font: string, color: Color, borderColor: Color, weight: string): Text
{

}

// работа с картинкой

function createImage(path: string): Image
{

}

// работа с графическим примитивом

function updateGraphicPrimitive(prevGraphicPrimitive: text, parameter: unknown): GraphicPrimitive
{

}

function createGraphicPrimitive(type: Primitive): GraphicPrimitive
{

}