var Immutable = require('immutable');
var Draft = require('draft-js');

var TYPES = require('./TYPES');
var createHeader = require('./createHeader');
var createBody = require('./createBody');

/**
    Create a new table

    @param {String} parentKey
    @param {Number} countRows
    @param {Number} countColumns
    @return {OrderedMap<String:Draft.ContentBlock>}
*/
function createTable(parentKey, countRows, countColumns) {
    var tableKey = parentKey? Draft.genNestedKey(parentKey) : Draft.genKey();
    var tableBlock = new Draft.ContentBlock({
        key: tableKey,
        type: TYPES.TABLE
    });

    return Immutable.OrderedMap([
        [tableKey, tableBlock]
    ])
    .merge(
        createHeader(tableKey, countColumns)
    )
    .merge(
        createBody(tableKey, countRows, countColumns)
    );
}

module.exports = createTable;
