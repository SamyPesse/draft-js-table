var Draft = require('draft-js');

var TYPES = require('./TYPES');
var TableAnchor = require('./tableAnchor');
var findParentByType = require('./findParentByType');

/**
 * Remove a row from a table
 *
 * @param {Draft.EditorState} editorState
 * @return {Draft.EditorState}
 */
function removeRow(editorState) {
    var selection    = editorState.getSelection();
    var contentState = editorState.getCurrentContent();
    var startKey     = selection.getStartKey();

    var currentCell = contentState.getBlockForKey(startKey);

    if (currentCell.getType() !== TYPES.CELL) {
        return editorState;
    }

    // todo: trying to delete header row should delete the whole table
    // table should at least have a row

    var rowBlock = findParentByType(contentState, currentCell, TYPES.ROW);
    var blockMap = contentState.getBlockMap();

    // Remove the row and its cells
    var newBlockMap = blockMap.filterNot(function(block) {
        return (block === rowBlock
            || block.getKey().indexOf(rowBlock.getKey()) === 0);
    });

    // Find first cell before the current row
    var newCurrentCell = blockMap
        .takeUntil(function(block) {
            return block === rowBlock;
        })
        .findLast(function(block) {
            return block.getType() === TYPES.CELL;
        });

    var newContent = contentState.merge({
        blockMap: newBlockMap,
        selectionBefore: selection,

        // todo: select row before
        selectionAfter: Draft.SelectionState.createEmpty(newCurrentCell.getKey())
    });

    // Push new contentState
    var newEditorState = Draft.EditorState.push(editorState, newContent, 'remove-row');

    // Force selection in new row
    return Draft.EditorState.forceSelection(
        newEditorState,
        newContent.getSelectionAfter()
    );
}

module.exports = removeRow;
