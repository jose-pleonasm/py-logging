var Logger = require('./Logger');

/**
 * Manager, which holds the hierarchy of loggers.
 *
 * @private
 */
var Manager = {};

/**
 * @private
 * @type {Logger}
 */
Manager.root = new Logger(null, 'root', Logger.WARNING);

/**
 * @private
 * @type {Object}
 */
Manager._loggers = {};

/**
 * Get a logger with the specified name, creating it 
 * if it doesn't yet exist. This name is a dot-separated hierarchical 
 * name, such as "a", "a.b", "a.b.c" or similar.
 *
 * @param  {string} name
 * @return {Object}
 */
Manager.getLogger = function(name) {
	var parts = name.split('.');
	var currentName = '';
	var prevLogger = Manager.root;
	for (var i = 1, len = parts.length; i <= len; i++) {
		currentName = parts.slice(0, i).join('.');
		if (!Manager._loggers[currentName]) {
			Manager._loggers[currentName] = new Logger(prevLogger, currentName);
		}
		prevLogger = Manager._loggers[currentName];
	}

	return Manager._loggers[name];
};

/**
 *  Removes all the loggers.
 */
Manager.clear = function() {
	var names = Object.keys(Manager._loggers);
	var name = '';

	for (var i = 0, len = names.length; i < len; i++) {
		name = names[i];
		Manager._loggers[name] = null;
		delete Manager._loggers[name];
	}
	Manager.root = null;
};


module.exports = Manager;
