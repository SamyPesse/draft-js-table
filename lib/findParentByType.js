
/**
    Find parent of a block by its type (or return null)

    @param {Draft.ContentState} contentState
    @param {Draft.ContentBlock} block
    @param {String} expectType
    @return {Draft.ContentBlock}
*/
function findParentByType(contentState, block, expectType) {
    if (!block) {
        return null;
    }

    if (block.getType() === expectType) {
        return block;
    }

    var parentKey = block.getParentKey();
    var parentBlock = contentState.getBlockForKey(parentKey);

    return findParentByType(contentState, parentBlock, expectType);
}

module.exports = findParentByType;
