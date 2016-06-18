var expect = require('expect');

var getAlignForCell = require('../getAlignForCell');
var contentState = require('./mock');

describe('getAlignForCell', function() {
    it('should return correct alignment', function() {
        var align = getAlignForCell(contentState, 'tableKey/bodyKey/row2Key/cell22Key');
        expect(align).toBe('right');
    });

    it('should return correct alignment (2)', function() {
        var align = getAlignForCell(contentState, 'tableKey/headKey/headRowKey/cell1Key');
        expect(align).toBe('left');
    });
});
