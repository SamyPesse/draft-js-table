var getTableForBlock = require('./getTableForBlock');

/**
 * Get main table block for a selection (or return null)
 *
 * @param {Draft.ContentState}
 * @param {Draft.SelectionState}
 * @return {Draft.ContentBlock}
 */
function getTableForSelection(contentState, selection) {
    var startKey = selection.getStartKey();
    return getTableForBlock(contentState, startKey);
}

module.exports = getTableForSelection;
