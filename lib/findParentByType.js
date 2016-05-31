
/**
    Find parent of a block by its type (or return null)

    @param {Draft.ContentState} contentState
    @param {Draft.ContentBlock} block
    @param {String} expectType
    @return {Draft.ContentBlock}
*/
function findParentByType(contentState, block, expectType) {
    if (block.getType() === expectType) {
        return block;
    }

    var parentKey = block.getParentKey();
    var parentBlock = contentState.getBlockForKey(parentKey);

    if (parentBlock) {
        return findParentByType(contentState, parentBlock, expectType);
    }

    return null;
}

module.exports = findParentByType;
