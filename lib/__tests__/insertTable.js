var Draft = require('draft-js');
var expect = require('expect');

var insertTable = require('../insertTable');

describe('insertTable', function() {
    var contentState = Draft.convertFromRaw({
        entityMap: {},
        blocks: [
            {
                key: 'a',
                text: 'Hello',
                type: 'unstyled'
            }
        ]
    });
    var editorState = Draft.EditorState.createWithContent(contentState);

    it('should insert a row after the current one (first)', function() {
        var selection = Draft.SelectionState.createEmpty('a');
        var newEditorState = Draft.EditorState.acceptSelection(editorState, selection);

        var resultEditorState = insertTable(newEditorState, 2, 2);
        var resultContent = resultEditorState.getCurrentContent();

        console.log(JSON.stringify(Draft.convertToRaw(resultContent), null, 4));
        /*var rows = resultContent.getBlockChildren('tableKey/bodyKey')
        expect(rows.size).toBe(3);
        expect(rows.first().getKey()).toBe('tableKey/bodyKey/row1Key');
        expect(rows.last().getKey()).toBe('tableKey/bodyKey/row2Key');*/
    });
});
