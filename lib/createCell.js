var Immutable = require('immutable');
var Draft = require('draft-js');

var TYPES = require('./types');

/**
    Create a row block with a specific count of cells

    @param {String} parentKey
    @param {String} text
    @return {Draft.ContentBlock}
*/
function createCell(parentKey, text) {
    var cellKey = Draft.genNestedKey(parentKey);

    return new Draft.ContentBlock({
        key: cellKey,
        type: TYPES.CELL,
        text: text,
        characterList: Immutable.List(Immutable.Repeat(Draft.CharacterMetadata.create(), text.length))
    });
}

module.exports = createCell;
