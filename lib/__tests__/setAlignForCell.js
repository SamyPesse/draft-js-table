var expect = require('expect');

var getAlignForCell = require('../getAlignForCell');
var setAlignForCell = require('../setAlignForCell');
var contentState = require('./mock');

describe('setAlignForCell', function() {
    it('should correctly update the alignment', function() {
        var cellKey = 'tableKey/bodyKey/row2Key/cell22Key';

        var newContentState = setAlignForCell(contentState, cellKey, 'center');
        var align = getAlignForCell(newContentState, cellKey);
        expect(align).toBe('center');
    });
});
