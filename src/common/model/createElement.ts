import * as types from "../types";
import { generateId } from "../utils/generateId";

function createSlide(): types.Slide
{
    return {
        id: generateId(),
        areas: [],
        backgroundColor: "white",
        backgroundImage: {type: "imageUrl", path: ""},
    }
}

export 
{
    createSlide,
};