var Draft = require('draft-js');
var expect = require('expect');

var getTableForSelection = require('../getTableForSelection');
var contentState = require('./mock');

describe('getTableForSelection', function() {
    it('should return correct table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row1Key/cell12Key');

        var block = getTableForSelection(contentState, selection);
        expect(block.getKey()).toBe('tableKey');
    });

    it('should return correct table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row2Key/cell22Key');

        var block = getTableForSelection(contentState, selection);
        expect(block.getKey()).toBe('tableKey');
    });

    it('should return correct table', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row2Key/cell21Key');

        var block = getTableForSelection(contentState, selection);
        expect(block.getKey()).toBe('tableKey');
    });
});
