var getHeaderForBlock = require('./getHeaderForBlock');
var TableAnchor = require('./tableAnchor');

/**
 * Change text alignment for column
 *
 * @param {Draft.ContentState} contentState
 * @param {String} cellKey
 * @param {String} value
 * @return {Draft.ContentState}
 */
function setAlignForCell(contentState, cellKey, value) {
    var tableHeader = getHeaderForBlock(contentState, cellKey);
    var anchor      = TableAnchor.createForBlock(contentState, cellKey);


    var data  = tableHeader.getData();
    var align = data.get('align');

    align[anchor.getColumn()] = value;
    tableHeader = tableHeader.set('data',
        data.set('align', align)
    );

    var blockMap = contentState.getBlockMap();
    blockMap = blockMap.set(tableHeader.getKey(), tableHeader);

    return contentState.set('blockMap', blockMap);

}

module.exports = setAlignForCell;
