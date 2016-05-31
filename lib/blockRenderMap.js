var Immutable = require('immutable');

module.exports = Immutable.Map({
    'table': {
        element: 'div',
        nestingEnabled: true
    },
    'table-body': {
        element: 'div',
        nestingEnabled: true
    },
    'table-header': {
        element: 'div',
        nestingEnabled: true
    },
    'table-cell': {
        element: 'div',
        nestingEnabled: false
    },
    'table-row': {
        element: 'div',
        nestingEnabled: true
    }
});
