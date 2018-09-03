var Logger = require('./Logger');

var loggers = {};

/**
 * Manager, which holds the hierarchy of loggers.
 *
 * @private
 */
var Manager = {};

/**
 * @type {Logger}
 */
Manager.root = new Logger(Manager, 'root', null, Logger.WARNING);

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
		if (!loggers[currentName]) {
			loggers[currentName] = new Logger(Manager, currentName, prevLogger);
		}
		prevLogger = loggers[currentName];
	}

	return loggers[name];
};

/**
 *  Removes all the loggers.
 */
Manager.clear = function() {
	var names = Object.keys(loggers);
	var name = '';

	for (var i = 0, len = names.length; i < len; i++) {
		name = names[i];
		loggers[name] = null;
		delete loggers[name];
	}
	Manager.root = null;
};


module.exports = Manager;
