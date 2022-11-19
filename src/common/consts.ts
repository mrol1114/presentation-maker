import type * as types from './types';

const notSelectedIndex = -1;

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
    emptyTextInfo, 
    emptyGraphicPrimitiveInfo,
    defaultTextInfo,
    defaultGraphicPrimitiveInfo,
};