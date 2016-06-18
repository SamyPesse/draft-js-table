var Draft = require('draft-js');
var expect = require('expect');

var insertColumn = require('../insertColumn');
var contentState = require('./mock');

describe('insertColumn', function() {
    var editorState = Draft.EditorState.createWithContent(contentState);

    it('should insert a row after the current one (first)', function() {
        var selection = Draft.SelectionState.createEmpty('tableKey/bodyKey/row1Key/cell12Key');
        var newEditorState = Draft.EditorState.acceptSelection(editorState, selection);

        var resultEditorState = insertColumn(newEditorState);
        var resultContent = resultEditorState.getCurrentContent();

        var row1cells = resultContent.getBlockChildren('tableKey/bodyKey/row1Key');
        expect(row1cells.size).toBe(3);

        var row2cells = resultContent.getBlockChildren('tableKey/bodyKey/row2Key');
        expect(row2cells.size).toBe(3);
    });
});
