var Immutable = require('immutable');
var Draft = require('draft-js');

var TYPES = require('./types');

/**
    Create a row block with a specific count of cells

    @param {String} parentKey
    @param {Number} countCells
    @return {OrderedMap<String:Draft.ContentBlock>}
*/
function createRow(parentKey, countCells) {
    // Create new row
    var rowKey = Draft.genNestedKey(parentKey);
    var rowBlock = new Draft.ContentBlock({
        key: rowKey,
        type: TYPES.ROW
    });

    // Generate new cells
    var cells = Immutable.Range(0, countCells)
        .map(function(i) {
            var cellKey = Draft.genNestedKey(rowKey);
            var cellText = 'Cell ' + i;

            var cellBlock = new Draft.ContentBlock({
                key: cellKey,
                type: TYPES.CELL,
                text: cellText,
                characterList: Immutable.List(Immutable.Repeat(Draft.CharacterMetadata.create(), cellText.length))
            });

            return [cellKey, cellBlock];
        })
        .toArray();

    return Immutable.OrderedMap([
        [rowKey, rowBlock]
    ].concat(cells));
}

module.exports = createRow;
