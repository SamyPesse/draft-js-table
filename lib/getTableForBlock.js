var TYPES = require('./TYPES');
var findParentByType = require('./findParentByType');


/**
 * Get main table block for a block key
 *
 * @param {Draft.ContentState}
 * @param {Draft.SelectionState}
 * @return {Draft.ContentBlock}
 */
function getTableForBlock(contentState, blockKey) {
    var currentBlock = contentState.getBlockForKey(blockKey);

    return findParentByType(contentState, currentBlock, TYPES.TABLE);
}

module.exports = getTableForBlock;
