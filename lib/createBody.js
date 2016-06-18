var Immutable = require('immutable');
var Draft = require('draft-js');

var TYPES = require('./TYPES');
var createRow = require('./createRow');

/**
 * Create a new table body
 *
 * @param {String} tableKey
 * @param {Number} countRows
 * @param {Number} countColumns
 * @return {OrderedMap<String:Draft.ContentBlock>}
 */
function createBody(tableKey, countRows, countColumns) {
    var tableBodyKey = Draft.genNestedKey(tableKey);
    var tableBodyBlock = new Draft.ContentBlock({
        key: tableBodyKey,
        type: TYPES.BODY
    });

    var result = Immutable.OrderedMap([
        [tableBodyKey, tableBodyBlock]
    ]);

    return Immutable.Range(0, countRows)
        .reduce(function(map) {
            var rowBlocks = createRow(tableBodyKey, countColumns);
            return map.merge(rowBlocks)
        }, result);
}

module.exports = createBody;
