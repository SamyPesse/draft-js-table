var Immutable = require('immutable');
var Draft = require('draft-js');

var TYPES = require('./types');
var getTableForSelection = require('./getTableForSelection');
var getPositionForSelection = require('./getPositionForSelection');
var createRow = require('./createRow');

/**
    Insert a row in a table

    @param {Draft.EditorState} editorState
    @return {Draft.EditorState}
*/
function insertRow(editorState) {
    var selection = editorState.getSelection();
    var content = editorState.getCurrentContent();

    var tableBlock = getTableForSelection(content, selection);

    // Not a table?
    if (!tableBlock) {
        return editorState;
    }

    var position = getPositionForSelection(content, selection);

    // Find head and body
    var tableBlocks = content.getBlockChildren(tableBlock.getKey());
    var tableHead = tableBlocks.find(function(blk) {
        return blk.getType() === TYPES.HEADER;
    });
    var tableBody = tableBlocks.find(function(blk) {
        return blk.getType() === TYPES.BODY;
    });

    // Search for a row, to get count of cells
    var firstRow = content.getBlockChildren(tableBody.getKey()).last() ||
        content.getBlockChildren(tableHead.getKey()).first();
    if (!firstRow) {
        return editorState;
    }

    var countCells = content.getBlockChildren(firstRow.getKey()).size;

    // Create row
    var rowBlocks = createRow(tableBody.getKey(), countCells);
    var firstCell = rowBlocks.find(function(blk) {
        return blk.getType() === TYPES.CELL;
    });

    var blockMap = content.getBlockMap();
    var blocksBefore = blockMap.toSeq()
        .takeUntil(function(blk) {
            return blk === firstRow;
        });
    var blocksAfter = blockMap.toSeq()
        .skipUntil(function(blk) {
            return blk === firstRow;
        })
        .rest();
    var newBlocks = blocksBefore.concat(
        [[firstRow.getKey(), firstRow]],
        rowBlocks.toSeq(),
        blocksAfter
    ).toOrderedMap();

    //console.log('newBlocks', newBlocks.toJS())
    var newContent = content.merge({
        blockMap: newBlocks,
        selectionBefore: selection,
        selectionAfter: selection.merge({
            anchorKey: firstCell.getKey(),
            anchorOffset: 0,
            focusKey: firstCell.getKey(),
            focusOffset: 0,
            isBackward: false,
        })
    });

    // Push new contentState
    return Draft.EditorState.push(editorState, newContent, 'insert-row');
}

module.exports = insertRow;
