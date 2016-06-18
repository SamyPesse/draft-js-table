var getTableForSelection = require('./getTableForSelection');

/**
 * Return true if an EditorState has its selection in a table cell
 *
 * @param {Draft.EditorState} editorState
 * @return {Boolean}
 */
function hasSelectionInTable(editorState) {
    var selection = editorState.getSelection();
    var content = editorState.getCurrentContent();

    return Boolean(getTableForSelection(content, selection));
}

module.exports = hasSelectionInTable;
