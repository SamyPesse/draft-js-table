var Draft = require('draft-js');

var createCell = require('./createCell');
var getTableForSelection = require('./getTableForSelection');
var TableAnchor = require('./tableAnchor');
var TYPES = require('./TYPES');

/**
    Insert a cell into a row

    @param {OrderedMap<String:ContentBlock>} blockMap
    @param {Number} index
    @param {String} text
    @return {OrderedMap<String:ContentBlock>}
*/
function insertCellInRow(blockMap, rowBlock, index, text) {
    var blockSeq = blockMap.toSeq();

    var blocksBeforeRow = blockSeq
        .takeUntil(function(blk) {
            return blk === rowBlock;
        });

    var blocksAfterRow = blockSeq
        .skipUntil(function(blk) {
            return blk === rowBlock;
        })
        .rest();

    var blockCells = blocksAfterRow
        .takeUntil(function(blk) {
            return blk.getType() !== TYPES.CELL;
        });
    var cellsBefore = blockCells
        .takeUntil(function(blk, i) {
            return (i === index);
        });
    var cellsAfter = blockCells
        .skipUntil(function(blk, i) {
            return (i === index);
        })
        .rest();

    // Create new cell and add it in the list
    var newCellBlock = createCell(rowBlock.getKey(), text);

    // Create new sequence of cells
    var newCells = cellsBefore.concat(
        [[newCellBlock.getKey(), newCellBlock]],
        cellsAfter
    );

    // Create new map of blocks
    return blocksBeforeRow.concat(
        [[rowBlock.getKey(), rowBlock]],
        newCells,
        blocksAfterRow
    ).toOrderedMap();
}

/**
    Insert a column in a table

    @param {Draft.EditorState} editorState
    @return {Draft.EditorState}
*/
function insertColumn(editorState) {
    var selection = editorState.getSelection();
    var content = editorState.getCurrentContent();

    var tableBlock = getTableForSelection(content, selection);

    // Not a table?
    if (!tableBlock) {
        return editorState;
    }

    var anchor = TableAnchor.createForSelection(content, selection);
    var cellIndex = anchor.getColumn();

    var tableKey = tableBlock.getKey();
    var blockMap = content.getBlockMap();

    // Extract list of rows
    var rowBlocks = content.getBlockMap()
        .filter(function(block) {
            return (block.getParentKey().indexOf(tableKey) === 0
                && block.getType() === TYPES.ROW);
        });

    // Insert cell for each row
    var newBlockMap = rowBlocks.reduce(function(_blockMap, rowBlock) {
        return insertCellInRow(_blockMap, rowBlock, cellIndex, 'Cell');
    }, blockMap);

    var newContent = content.merge({
        blockMap: newBlockMap,
        selectionBefore: selection,
        selectionAfter: selection
    });

    // Push new contentState
    return Draft.EditorState.push(editorState, newContent, 'insert-column');
}

module.exports = insertColumn
