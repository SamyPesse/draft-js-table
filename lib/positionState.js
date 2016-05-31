var Immutable = require('immutable');

var PositionState = Immutable.Record({
    row:        Number(0),
    column:     Number(0)
}, 'PositionState');

PositionState.prototype.getRow = function() {
    return this.get('row');
};

PositionState.prototype.getColumn = function() {
    return this.get('column');
};

module.exports = PositionState;
