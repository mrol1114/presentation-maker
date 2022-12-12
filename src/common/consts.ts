import type * as types from './types';

const notSelectedIndex = -1;

const defaultTextInfo: types.TextInfo = {
    type: 'text',
    color: 'black',
    strokeColor: 'black',
    strokeWidth: 0,
    fontSize: 80,
    font: 'Arial',
    italic: false,
    bold: false,
    underlined: false,
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
    defaultTextInfo,
    defaultGraphicPrimitiveInfo,
};