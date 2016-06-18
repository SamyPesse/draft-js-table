var getHeaderForBlock = require('./getHeaderForBlock');
var TableAnchor = require('./tableAnchor');
var ALIGNS = require('./ALIGNS');

/**
 * Get text alignment for a cell
 * @return {String}
 */
function getAlignForCell(contentState, cellKey) {
    var tableHeader = getHeaderForBlock(contentState, cellKey);
    var anchor      = TableAnchor.createForBlock(contentState, cellKey);
    var data        = tableHeader.getData();
    var align       = data.get('align');

    return align[anchor.getColumn()] || ALIGNS.LEFT;
}

module.exports = getAlignForCell;
