var Immutable = require('immutable');
var Draft = require('draft-js');

var TYPES = require('./types');
var getTableForSelection = require('./getTableForSelection');
var getPositionForSelection = require('./getPositionForSelection');

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
    if (currentBlock.getType() !== TYPES.TABLE) {
        return editorState;
    }

    var position = getPositionForSelection(content, selection);

    // Find head and body
    var tableBlocks = content.getBlockChildren(tableBlock.getKey());
    var tableHead = tableBlocks.find(function(blk) {
        return blk.getType() === TYPES.HEAD;
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

    // Create new row
    var rowKey = Draft.genNestedKey(tableBody.getKey());
    var rowBlock = new Draft.ContentBlock({
        key: rowKey,
        type: TYPES.TABLE_ROW
    });

    // Generate new cells
    var firstCellKey;
    var cells = Immutable.Range(countCells)
        .map(function(i) {
            var cellKey = Draft.genNestedKey(rowKey);
            var cellText = 'Cell ' + i;

            if (!firstCellKey) {
                firstCellKey = cellKey;
            }

            var cellBlock = new Draft.ContentBlock({
                key: cellKey,
                type: TYPES.TABLE_CELL,
                text: cellText
                // todo characterList
            });

            return [cellKey, cellBlock];
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
    var newBlocks = blocksBefore.concat(cells, blocksAfter).toOrderedMap();

    var newContent = content.merge({
        blockMap: newBlocks,
        selectionBefore: selection,
        selectionAfter: selection.merge({
            anchorKey: firstCellKey,
            anchorOffset: 0,
            focusKey: firstCellKey,
            focusOffset: 0,
            isBackward: false,
        })
    });

    // Push new contentState
    return Draft.EditorState.push(editorState, newContent, 'insert-row');
}

module.exports = insertRow;
