var Draft = require('draft-js');
var expect = require('expect');

var getPositionForSelection = require('../getPositionForSelection');
var contentState = require('./mock');

describe('getPositionForSelection', function() {
    it('should return correct position in the table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row1Key/cell12Key');

        var position = getPositionForSelection(contentState, selection);
        expect(position.getRow()).toBe(0);
        expect(position.getColumn()).toBe(1);
    });

    it('should return correct position in the table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row2Key/cell22Key');

        var position = getPositionForSelection(contentState, selection);
        expect(position.getRow()).toBe(1);
        expect(position.getColumn()).toBe(1);
    });

    it('should return correct position in the table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row2Key/cell21Key');

        var position = getPositionForSelection(contentState, selection);
        expect(position.getRow()).toBe(1);
        expect(position.getColumn()).toBe(0);
    });
});
