var Draft = require('draft-js');
var expect = require('expect');

var TableAnchor = require('../tableAnchor');
var contentState = require('./mock');

describe('TableAnchor', function() {
    it('should return correct position in the table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row1Key/cell12Key');

        var position = TableAnchor.createForSelection(contentState, selection);
        expect(position.getRow()).toBe(1);
        expect(position.getRowIndex()).toBe(0);
        expect(position.getColumn()).toBe(1);
    });

    it('should return correct position in the table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row2Key/cell22Key');

        var position = TableAnchor.createForSelection(contentState, selection);
        expect(position.getRow()).toBe(2);
        expect(position.getRowIndex()).toBe(1);
        expect(position.getColumn()).toBe(1);
    });

    it('should return correct position in the table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row2Key/cell21Key');

        var position = TableAnchor.createForSelection(contentState, selection);
        expect(position.getRow()).toBe(2);
        expect(position.getRowIndex()).toBe(1);
        expect(position.getColumn()).toBe(0);
    });
});
