/**
 * When using this framework please extend from the following objects.
 * When done wrong the framework might break, and/ or function unpredicted.
 */

// Require ES6-SHIM for the time being
require('es6-shim');

module.exports.Router = require('./lib/router/router');
module.exports.Dispatcher = require('./lib/dispatcher/dispatcher');
module.exports.Controller = require('./lib/controller/controller');
module.exports.ViewJson = require('./lib/view/json');
module.exports.Model = require('./lib/model/model');
module.exports.ModelAbstract = require('./lib/model/abstract');
module.exports.Table = require('./lib/database/table/table');

module.exports.Inflector = require('./lib/inflector/inflector');