var Draft = require('draft-js');
var TYPES = require('../TYPES');

var mockTable = Draft.convertFromRaw({
    entityMap: {},
    blocks: [
        {
            key: 'tableKey',
            type: TYPES.TABLE,
            text: '',
            blocks: [
                {
                    key: 'headKey',
                    type: TYPES.HEAD,
                    text: '',
                    blocks: [
                        {
                            key: 'headRowKey',
                            type: TYPES.ROW,
                            text: '',
                            blocks: [
                                {
                                    key: 'cell1Key',
                                    type: TYPES.CELL,
                                    text: 'Hello'
                                },
                                {
                                    key: 'cell2Key',
                                    type: TYPES.CELL,
                                    text: 'World'
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'bodyKey',
                    type: TYPES.BODY,
                    text: '',
                    blocks: [
                        {
                            key: 'row1Key',
                            type: TYPES.ROW,
                            text: '',
                            blocks: [
                                {
                                    key: 'cell11Key',
                                    type: TYPES.CELL,
                                    text: '1'
                                },
                                {
                                    key: 'cell12Key',
                                    type: TYPES.CELL,
                                    text: '2'
                                }
                            ]
                        },
                        {
                            key: 'row2Key',
                            type: TYPES.ROW,
                            text: '',
                            blocks: [
                                {
                                    key: 'cell21Key',
                                    type: TYPES.CELL,
                                    text: '3'
                                },
                                {
                                    key: 'cell22Key',
                                    type: TYPES.CELL,
                                    text: '4'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}, Draft.NestedUtils.DefaultBlockRenderMap);

module.exports = mockTable;
