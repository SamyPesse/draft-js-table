var getTableForBlock = require('./getTableForBlock');
var TYPES = require('./TYPES');

/**
 * Get header block for a cell/row/table
 * @param {Draft.ContentState} contentState
 * @param {String} cellKey
 * @return {Draft.ContentBlock}
 */
function getHeaderForBlock(contentState, cellKey) {
    var tableBlock  = getTableForBlock(contentState, cellKey);
    var tableBlocks = contentState.getBlockChildren(tableBlock.getKey());

    return tableBlocks.find(function(blk) {
        return blk.getType() === TYPES.HEADER;
    });
}

module.exports = getHeaderForBlock;
