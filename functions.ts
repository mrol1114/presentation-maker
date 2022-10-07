// загрузкы, выгрузка

function download(): PresentationMaker
{

}

function convertPresentationMakerToJson(presentationMaker: PresentationMaker): JSON
{

}

function convertJsonToPresentationMaker(json: JSON): PresentationMaker
{

}

function save(obj: SaveObj): void
{

}

function convertPdf(PresentationMaker: PresentationMaker): Pdf
{

}

// работа с массивом слайдов

function addSlide(presentationMaker: PresentationMaker, newSlide: Slide): PresentationMaker
{
    const newSlides: Slide[] = [
        ...presentationMaker.slidesGroup.slides,
        newSlide,
    ];

    const newSelectedSlides: number[] = [
        ...presentationMaker.slidesGroup.selectedIds,
        newSlide.id,
    ];

    const currentId = presentationMaker.slidesGroup.currentId >= 0 ? presentationMaker.slidesGroup.currentId + 1 : presentationMaker.slidesGroup.slides.length + 1;

    const newSlidesGroup: SlidesGroup = {
        slides: newSlides,
        currentId: currentId,
        selectedIds: newSelectedSlides,
    };

    return {
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup,
        ],
        slidesGroup: newSlidesGroup,
        name: presentationMaker.name,
    }
}

function deleteSlide(presentationMaker: PresentationMaker): PresentationMaker
{
    const newSlides: Slide[] = presentationMaker.slidesGroup.slides;

    const newSelectedSlides: number[] = presentationMaker.slidesGroup.selectedIds;

    newSlides.splice(presentationMaker.slidesGroup.currentId, 1);
    newSelectedSlides.splice(presentationMaker.slidesGroup.currentId, 1);

    const currentId = presentationMaker.slidesGroup.currentId;

    const newSlidesGroup: SlidesGroup = {
        slides: newSlides,
        currentId: (currentId - 1 < 0) ? 0 : currentId - 1,
        selectedIds: newSelectedSlides,
    };

    return {
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup,
        ],
        slidesGroup: newSlidesGroup,
        name: presentationMaker.name,
    }
}

function updateSlide(presentationMaker: PresentationMaker, newSlide: Slide): PresentationMaker
{
    const newSlides: Slide[] = presentationMaker.slidesGroup.slides;

    newSlides.map(function(slide, i) {
        if (slide.id === newSlide.id) {
            newSlides[i] = newSlide;
        }
    });

    const newSlidesGroup: SlidesGroup = {
        slides: newSlides,
        currentId: newSlide.id,
        selectedIds: presentationMaker.slidesGroup.selectedIds,
    };

    return {
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup,
        ],
        slidesGroup: newSlidesGroup,
        name: presentationMaker.name,
    }
}

function updateSelectSlide(presentationMaker: PresentationMaker, slideId: number): PresentationMaker
{
    const newSlidesGroup: SlidesGroup = {
        slides: presentationMaker.slidesGroup.slides,
        currentId: slideId,
        selectedIds: [
            ...presentationMaker.slidesGroup.selectedIds,
            slideId,
        ],
    };

    return {
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup,
        ],
        slidesGroup: newSlidesGroup,
        name: presentationMaker.name,
    }
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

function changeBackgroundImageToSlide(presentationMaker: PresentationMaker, img: ImageInfo, id: number, position: number): PresentationMaker
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
function updateArea(presentationMaker: PresentationMaker, area: Area, idSlide: number, idArea: number): PresentationMaker
{
    const newSlide: Slide = {
        ...presentationMaker.slidesGroup.slides[idSlide],
        areas: [...presentationMaker.slidesGroup.slides[idSlide].areas.map((value, index) => {
            if (index === idArea) {
                value = area
            }
            return value
            })
        ]    
    }

    const newSlidesGroup: SlidesGroup = {
        ...presentationMaker.slidesGroup,
        slides: [...presentationMaker.slidesGroup.slides.map((value, index) => {
            if (index === idSlide) {
                value = newSlide
            }
            return value
            })
        ]
    }

    return {
        ...presentationMaker,
        localHistory: [
            ...presentationMaker.localHistory,
            newSlidesGroup,
        ],
        slidesGroup: newSlidesGroup,
    }
}

// работа с текстом

function updateText(presentationMaker: PresentationMaker, prevText: TextInfo, newText: TextInfo): PresentationMaker
{

}

function createText(presentationMaker: PresentationMaker, font: string, color: Color, borderColor: Color, weight: string): PresentationMaker
{

}

// работа с картинкой

function createImage(presentationMaker: PresentationMaker, path: string): PresentationMaker
{

}

// работа с графическим примитивом

function updateGraphicPrimitive(presentationMaker: PresentationMaker, prevGraphicPrimitive: TextInfo, parameter: unknown): PresentationMaker
{

}

function createGraphicPrimitive(presentationMaker: PresentationMaker, type: Primitive): PresentationMaker
{

}