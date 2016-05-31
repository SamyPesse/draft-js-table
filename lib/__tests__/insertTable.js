var Draft = require('draft-js');
var expect = require('expect');

var insertTable = require('../insertTable');
var TYPES = require('../TYPES');

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

        var tableBlock = resultContent.getFirstBlock();
        var main = resultContent.getBlockChildren(tableBlock.getKey())
        expect(main.size).toBe(2);

        var head = main.first();
        var body = main.last();

        expect(head.getType()).toBe(TYPES.HEADER);
        expect(body.getType()).toBe(TYPES.BODY);

        // tocomplete
    });
});
