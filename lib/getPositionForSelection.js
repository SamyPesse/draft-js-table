var TYPES = require('./types');
var findParentByType = require('./findParentByType');
var PositionState = require('./positionState');

/**
    Get position {row,column} for selection in current table

    @param {Draft.ContentState}
    @param {Draft.SelectionState}
    @return {PositionState}
*/
function getPositionForSelection(contentState, selection) {
    var startKey = selection.getStartKey();
    var currentBlock = contentState.getBlockForKey(startKey);

    var cellBlock = findParentByType(contentState, currentBlock, TYPES.CELL);
    var rowBlock = findParentByType(contentState, currentBlock, TYPES.ROW);
    var bodyBlock = findParentByType(contentState, currentBlock, TYPES.BODY);

    if (!rowBlock || !cellBlock || !bodyBlock) {
        return new PositionState();
    }

    var rowBlocks = contentState.getBlockChildren(bodyBlock.getKey());
    var rowsBefore = rowBlocks.toSeq()
        .takeUntil(function(blk) {
            return blk === rowBlock;
        })
        .toList();

    var cellBlocks = contentState.getBlockChildren(rowBlock.getKey());
    var cellsBefore = cellBlocks.toSeq()
        .takeUntil(function(blk) {
            return blk === cellBlock;
        })
        .toList();

    return PositionState({
        row:        rowsBefore.size,
        column:     cellsBefore.size
    });
}

module.exports = getPositionForSelection;
