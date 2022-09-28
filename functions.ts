// загрузкы, выгрузка

function download(): slidesGroup
{

}

function convertSlidesGroupToJson(slidesGroup: slidesGroup): json
{

}

function convertJsonToSlidesGroup(json: json): slidesGroup
{

}

function save(obj: saveObj): void
{

}

function convertPdf(slidesGroup: slidesGroup): pdf
{

}

// работа с массивом слайдов

function addSlide(group: slidesGroup, newSlide: slide): slidesGroup
{

}

function deleteSlide(group: slidesGroup, id: number): slidesGroup
{

}

function updateSlide(group: slidesGroup, id: number): slidesGroup
{

}

function selectSlide(group: slidesGroup, id: number): slidesGroup
{

}

function moveSlide(group: slidesGroup, id: number, position: number): slidesGroup
{

}

function presentationPrewiev(slidesGroup: slidesGroup): void
{
    
}

function drawSlidesGroup(group: slidesGroup): void
{

}

// работа с слайдом

function changeBackgroundColorToSlide(group: slidesGroup, backgroundColor: color, id: number): slide
{

}

function changeBackgroundImageToSlide(group: slidesGroup, img: image, id: number, position: number): slide
{

}

function addArea(group: slidesGroup, id: number, slide: slide, content: areaContent): slide
{

}

function deleteArea(slide: slide, id: number, content: areaContent): slide
{

}

function selectArea(slide: slide, id: number, content: areaContent): slide
{

}

function drawSlide(slide: Slide): void
{

}

// работа с областью

function moveArea(slide: slide, id: number, content: areaContent): area
{

}

function changeZIndexArea(slide: slide, id: number, content: areaContent): area
{

}

function updateArea(slide: slide, id: number, content: areaContent): area
{

}

function drawArea(area: area): void
{

}

// работа с текстом

function updateText(prevText: text, parameter: unknown): text
{

}

function createText(font: string, color: color, borderColor: color, weight: string): text
{

}

// работа с картинкой

function createImage(path: string): image
{

}

// работа с графическим примитивом

function updateGraphicPrimitive(prevGraphicPrimitive: text, parameter: unknown): graphicPrimitive
{

}

function createGraphicPrimitive(type: primitive): graphicPrimitive
{

}