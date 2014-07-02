var Service = require('../service/service');
var util    = require('util');
var Inflector   = require('../inflector/inflector');

function AbstractDispatcher(config) {
    Service.call(this, config);
};

util.inherits(AbstractDispatcher, Service);

AbstractDispatcher.prototype.initialize = function(config) {
    if(config.controller) {
        this.controller = config.controller;
    }

    return Service.prototype.initialize.call(this, config);
};

/**
 * This function will return the Controller object for the request.
 *
 * @method getController
 * @param {Object} req NodeJS Request Object
 * @param {Object} res NodeJS Response Object
 * @returns {Promise} Return the Controller object
 */
AbstractDispatcher.prototype.getController = function (req, res) {
    var identifier = this.getIdentifier().clone();
    var self = this;

    // This is a little more nice, i can now just use return, gone callback :D
    this.controller = this.getService(identifier.setPath(['controller']).setName(Inflector.singularize(this.controller || req.url.query.view)))
        .then(function(controller) {
            controller.request = req;
            controller.response = res;
            controller.format = (req.url.query.format || Raddish.getConfig('format'));

            return controller;
        });
};

module.exports = AbstractDispatcher;