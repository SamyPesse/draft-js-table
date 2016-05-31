var Draft = require('draft-js');
var TYPES = require('./types');

/**
    Insert a table to replace current block

    @param {Draft.EditorState} editorState
    @param {Number} rows
    @param {Number} columns
    @return {Draft.EditorState}
*/
function insertTable(editorState, rows, columns) {
    var selection = editorState.getSelection();
    var content = editorState.getCurrentContent();

    // Get current block which will became the first cell
    var startKey = selection.getStartKey();
    var currentBlock = content.getBlockForKey(startKey);

    var parentKey = currentBlock.getParentKey();

    var tableKey = Draft.genNestedKey(parentKey);

    var tableBlock = new Draft.ContentBlock({
        key: tableKey,
        type: TYPES.TABLE
    });

    var tableHeadKey = Draft.genNestedKey(tableKey);
    var tableHeadBlock = new Draft.ContentBlock({
        key: tableHeadKey,
        type: TYPES.TABLE_HEAD
    });

    var tableBodyKey = Draft.genNestedKey(tableKey);
    var tableBodyBlock = new Draft.ContentBlock({
        key: tableBodyKey,
        type: TYPES.TABLE_BODY
    });


    // Append everythings to block map
    var blockMap = content.getBlockMap();

    //content =
}

module.exports = insertTable;
