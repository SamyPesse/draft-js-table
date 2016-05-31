var TYPES = require('./types');
var findParentByType = require('./findParentByType');


/**
    Get main table block for a selection (or return null)

    @param {Draft.ContentState}
    @param {Draft.SelectionState}
    @return {Draft.ContentBlock}
*/
function getTableForSelection(contentState, selection) {
    var startKey = selection.getStartKey();
    var currentBlock = contentState.getBlockForKey(startKey);

    return findParentByType(contentState, currentBlock, TYPES.TABLE);
}

module.exports = getTableForSelection;
