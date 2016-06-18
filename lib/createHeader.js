var Immutable = require('immutable');
var Draft = require('draft-js');

var TYPES = require('./TYPES');
var createRow = require('./createRow');

/**
 * Create a new table header
 *
 * @param {String} tableKey
 * @param {Number} countColumns
 * @return {OrderedMap<String:Draft.ContentBlock>}
 */
function createHeader(tableKey, countColumns) {
    var tableHeaderKey = Draft.genNestedKey(tableKey);
    var tableHeaderBlock = new Draft.ContentBlock({
        key: tableHeaderKey,
        type: TYPES.HEADER
    });

    return Immutable.OrderedMap([
        [tableHeaderKey, tableHeaderBlock]
    ])
    .merge(
        createRow(tableHeaderKey, countColumns)
    );
}

module.exports = createHeader;
