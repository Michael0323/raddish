var Abstract    = require('../abstract/query');
var util        = require('util');

function UpdateQuery() {
    Abstract.call(this);

    this.method = 'save';
    this.collection = '';
    this.query = {};
};

util.inherits(UpdateQuery, Abstract);

UpdateQuery.prototype.table = function(table) {
    this.collection = table;

    return this;
};

UpdateQuery.prototype.set = function(column, value) {
    this.query[column] = value;

    return this;
};

UpdateQuery.prototype.where = function(column, constraint, value, condition) {
    var parts = [];
    var base = this.query;

    /**
     * Lets have a look. We need to have nested columns,
     * constraints need to be converted.
     * Values don't need to be converted.
     * Also the condition needs to be converted, if there is none selected it will default to and.
     */
    switch(constraint) {
        case '>':
            constraint = '&gt';
            break;
        case '<':
            constraint = '&lt';
            break;
        case '=':
            constraint = undefined;
            break;
    }

    condition = condition ? condition.toLowerCase() : '';

    switch(condition) {
        case 'or':
            condition = '$or';
            break;
        default:
            condition = undefined;
            break;
    }

    // Now we will parse the columns also we will check if it is nested nor not.
    // Check if it is nested.
    if(column.indexOf('.') > -1) {
        // We have a nested column.
        parts = column.split('.');
    } else {
        parts.push(column);
    }

    if(condition) {
        if(!base[condition]) {
            base[condition] = [];
            base = base[condition];
        }
    }

    // So how do we format the columns?
    // Something is going wrong here.
    for(var index in parts) {
        if(!base[parts[index]]) {
            base[parts[index]] = {};
        }

        if(index == parts.length -1) {
            base[parts[index]] = value;
        } else {
            base = base[parts[index]];
        }
    }

    return this;
};

UpdateQuery.prototype.getTable = function() {
    return this.collection;
};

UpdateQuery.prototype.getMethod = function() {
    return this.method;
};

UpdateQuery.prototype.toQuery = function() {
    return this.query;
};

module.exports = UpdateQuery;