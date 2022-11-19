import type * as types from './types';

const notSelectedIndex = -1;

const emptyArea: types.UpdatedArea = {
    id: undefined,
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    zIndex: undefined,
};

const emptyTextInfo: types.UpdatedTextInfo = {
    color: undefined,
    borderColor: undefined,
    fontSize: undefined,
    font: undefined,
    weight: undefined,
    text: undefined
};

const emptyGraphicPrimitiveInfo: types.UpdatedGraphicPrimitiveInfo = {
    color: undefined,
    strokeColor: undefined,
    strokeWidth: undefined,
    primitive: undefined,
};

const defaultAreaValues: types.Area = {
    id: 0,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    zIndex: 0,
    contains: undefined,
};

const defaultTextInfo: types.TextInfo = {
    type: 'text',
    color: 'black',
    borderColor: 'black',
    fontSize: 80,
    font: 'Arial',
    weight: 40,
    text: '',
};

const defaultGraphicPrimitiveInfo: types.GraphicPrimitiveInfo = {
    type: 'primitive',
    color: 'white',
    strokeColor: 'black',
    strokeWidth: 1,
    primitive: 'rectangle',
};

export {
    notSelectedIndex,
    emptyArea, 
    emptyTextInfo, 
    emptyGraphicPrimitiveInfo,
    defaultAreaValues,
    defaultTextInfo,
    defaultGraphicPrimitiveInfo,
};