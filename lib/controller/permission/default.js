"use strict";

var Abstract    = require('./abstract');
var util        = require('util');

/**
 * Basic permissions object
 *
 * @param {Object} config The config object.
 */
function Permission(config) {
    Permission.super_.call(this, config);
}

util.inherits(Permission, Abstract);

/**
 * Return true by default on a browse request.
 *
 * @param {Object} context The complete context from the controller
 * @returns {Promise} Containing true by default
 */
Permission.prototype.canBrowse = function() {
    return Promise.resolve(true);
};

/**
 * Return true by default on a browse request.
 *
 * @param {Object} context The complete context from the controller
 * @returns {Promise} Containing true by default
 */
Permission.prototype.canRead = function() {
    return Promise.resolve(true);
};

/**
 * Only when a user is authenticated return true else return false.
 *
 * @param {Object} context The complete context from the controller
 * @returns {Promise} Containing true by default
 */
Permission.prototype.canAdd = function(context) {
    if(context.auth) {
        if(context.auth.username && context.auth.password) {
            return Promise.resolve(true);
        }
    }
    
    return Promise.resolve(false);
};

/**
 * Only when a user is authenticated return true else return false.
 *
 * @param {Object} context The complete context from the controller
 * @returns {Promise} Containing true by default
 */
Permission.prototype.canEdit = function(context) {
    if(context.auth) {
        if(context.auth.username && context.auth.password) {
            return Promise.resolve(true);
        }
    }
    
    return Promise.resolve(false);
};

/**
 * Only when a user is authenticated return true else return false.
 *
 * @param {Object} context The complete context from the controller
 * @returns {Promise} Containing true by default
 */
Permission.prototype.canDelete = function(context) {
    if(context.auth) {
        if(context.auth.username && context.auth.password) {
            return Promise.resolve(true);
        }
    }

    return Promise.resolve(false);
};

module.exports = Permission;