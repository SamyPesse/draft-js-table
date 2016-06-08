var Draft = require('draft-js');
var Immutable = require('immutable');

var TYPES = require('./types');
var findParentByType = require('./findParentByType');

var TableAnchor = Immutable.Record({
    // Key of the table block
    key:        String(),

    // Index of current row (header: 0)
    row:        Number(0),

    // Index of current column
    column:     Number(0),

    // Offset in cell
    offset:     Number(0)
});

TableAnchor.prototype.getKey = function() {
    return this.get('key');
};

TableAnchor.prototype.getRow = function() {
    return this.get('row');
};

TableAnchor.prototype.getColumn = function() {
    return this.get('column');
};

TableAnchor.prototype.getOffset = function() {
    return this.get('offset');
};

/**
 * Return index of the row in th container
 * @return {String}
 */
TableAnchor.prototype.getRowIndex = function() {
    var index = this.getRow();
    return (index>0? (index - 1) : 0);
};

/**
 * Return type of container for the anchor (body or header)
 * @return {String}
 */
TableAnchor.prototype.getContainerType = function() {
    return (this.getRow() === 0? TYPES.HEADER : TYPES.BODY);
};

/**
 * Convert the anchor to a SelectionState
 * @param {Draft.ContentState} contentState
 * @return {Draft.SelectionState|null}
 */
TableAnchor.prototype.toSelection = function(contentState) {
    var tableKey      = this.getKey();
    var containerType = this.getContainerType();
    var rowIndex      = this.getRowIndex();
    var columnIndex   = this.getColumn();
    var tableBlocks   = contentState.getBlockChildren(tableKey);

    var rowsContainer = tableBlocks.find(function(blk) {
        return blk.getType() === containerType;
    });

    // Get right row
    var rows     = contentState.getBlockChildren(rowsContainer.getKey());
    var row      = rows.toList().get(rowIndex);

    if (rowIndex < 0 || !row) {
        return null;
    }

    // Get right cell
    var cells       = contentState.getBlockChildren(row.getKey());
    var cell        = cells.toList().get(columnIndex);

    if (columnIndex < 0 || !cell) {
        return null;
    }

    var offset = this.getOffset();
    return Draft.SelectionState.createEmpty(cell.getKey())
        .merge({
            focusOffset:  offset,
            anchorOffset: offset
        });
};


/**
 * Create a TableAnchor from a SelectionState and a ContentState
 * @param {Draft.ContentState} contentState
 * @param {Draft.SelectionState} selection
 * @return {TableAnchor|null}
 */
TableAnchor.createForSelection = function(contentState, selection) {
    var startKey     = selection.getStartKey();
    var currentBlock = contentState.getBlockForKey(startKey);

    var cellBlock      = findParentByType(contentState, currentBlock, TYPES.CELL);
    var rowBlock       = findParentByType(contentState, currentBlock, TYPES.ROW);
    var containerBlock = (findParentByType(contentState, currentBlock, TYPES.BODY)
        || findParentByType(contentState, currentBlock, TYPES.HEADER));

    if (!rowBlock || !cellBlock || !containerBlock) {
        return null;
    }

    var tableBlock = findParentByType(contentState, containerBlock, TYPES.TABLE);
    var rowBlocks  = contentState.getBlockChildren(containerBlock.getKey());
    var rowsBefore = rowBlocks.toSeq()
        .takeUntil(function(blk) {
            return blk === rowBlock;
        })
        .toList();

    var cellBlocks  = contentState.getBlockChildren(rowBlock.getKey());
    var cellsBefore = cellBlocks.toSeq()
        .takeUntil(function(blk) {
            return blk === cellBlock;
        })
        .toList();

    var rowIndex    = rowsBefore.size;
    var columnIndex = cellsBefore.size;

    if (containerBlock.getType() === TYPES.BODY) {
        rowIndex = rowIndex + 1;
    }

    return TableAnchor({
        key:    tableBlock.getKey(),
        row:    rowIndex,
        column: columnIndex,
        offset: selection.getStartOffset()
    });
};

/**
 * Create a TableAnchor from an editorState
 * @param {Draft.EditorState} editorState
 * @return {TableAnchor|null}
 */
TableAnchor.createForEditor = function(editorState) {
    return TableAnchor.createForSelection(
        editorState.getCurrentContent(),
        editorState.getSelection()
    );
};

module.exports = TableAnchor;
