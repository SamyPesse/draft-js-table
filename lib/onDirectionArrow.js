var Draft = require('draft-js');

var TYPES = require('./types');
var TableAnchor = require('./tableAnchor');

/**
 * Move selection in table when pressing up arrow
 *
 * @param  {Number} move
 * @param  {Draft.EditorState} EditorState
 * @param  {SyntheticKeyboardEvent} e
 * @return {Draft.EditorState}
 */
function onDirectionArrow(move, editorState, e) {
    var selection    = editorState.getSelection();
    var contentState = editorState.getCurrentContent();

    // Get current block
    var startKey     = selection.getStartKey();
    var currentBlock = contentState.getBlockForKey(startKey);

    // Not a table cell, ignore
    if (currentBlock.getType() !== TYPES.CELL) {
        return editorState;
    }

    var anchor = TableAnchor.createForSelection(contentState, selection);

    // Move anchor
    var newAnchor = anchor.merge({
        row: anchor.getRow() + move,
        offset: 0
    });

    // New selection
    var newSelection = newAnchor.toSelection(contentState);
    if (!newSelection) {
        return editorState;
    }

    // We are moving the cursor at the end of the cell
    var newSelectedCell = contentState.getBlockForKey(newSelection.getStartKey());
    var offset          = newSelectedCell.getText().length;
    newSelection        = newSelection.merge({
        focusOffset:  offset,
        anchorOffset: offset
    });

    e.preventDefault();
    return Draft.EditorState.forceSelection(
        editorState,
        newSelection
    );
}

module.exports = onDirectionArrow;
