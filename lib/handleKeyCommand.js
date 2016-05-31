var TYPES = require('./types');

var insertRow = require('./insertRow');

/**
    Handle a draft command when inside a table

    @param {Draft.EditorState} editorState
    @param {Draft.EditorCommand} command
    @return {Draft.EditorState}
*/
function handleKeyCommand(editorState, command) {
    var selection = editorState.getSelection();
    var content = editorState.getCurrentContent();

    // Get current block
    var startKey = selection.getStartKey();
    var currentBlock = content.getBlockForKey(startKey);

    // Not a table cell, ignore
    if (currentBlock.getType() !== TYPES.CELL) {
        return null;
    }

    if (command === 'split-block') {
        return insertRow(editorState);
    }

    return null;
}

module.exports = handleKeyCommand;
