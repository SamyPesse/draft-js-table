var Draft = require('draft-js');
var expect = require('expect');

var insertRow = require('../insertRow');
var contentState = require('./mock');

describe('insertRow', function() {
    var editorState = Draft.EditorState.createWithContent(contentState);

    it('should insert a row after the current one (first)', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row1Key/cell12Key');
        var newEditorState = Draft.EditorState.acceptSelection(editorState, selection);

        var resultEditorState = insertRow(newEditorState);
        var resultContent = resultEditorState.getCurrentContent();

        var rows = resultContent.getBlockChildren('tableKey/bodyKey');
        expect(rows.size).toBe(3);
        expect(rows.first().getKey()).toBe('tableKey/bodyKey/row1Key');
        expect(rows.last().getKey()).toBe('tableKey/bodyKey/row2Key');
    });

    it('should move selection to the new row', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row1Key/cell12Key');
        var newEditorState = Draft.EditorState.acceptSelection(editorState, selection);

        var resultEditorState = insertRow(newEditorState);

        var resultSelection = resultEditorState.getSelection();
        var resultContent = resultEditorState.getCurrentContent();

        var rows = resultContent.getBlockChildren('tableKey/bodyKey');
        var newRow = rows.toList().get(1);

        var newCells = resultContent.getBlockChildren(newRow.getKey());
        expect(newCells.size).toBe(2);

        var firstCell = newCells.first();
        expect(resultSelection.getStartKey()).toBe(firstCell.getKey());
        expect(resultSelection.getEndKey()).toBe(firstCell.getKey());
    });
});
