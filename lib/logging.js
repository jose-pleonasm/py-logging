var Logger = require('./Logger');
var Formatter = require('./Formatter');
var handlers = require('./handlers');

/**
 * Manager, which holds the hierarchy of loggers.
 *
 * @private
 */
function Manager() {
	/** @type {Object} */
	this.root = null;

	/** @type {Object} */
	this._loggers = {};
}

/**
 * Get a logger with the specified name, creating it 
 * if it doesn't yet exist. This name is a dot-separated hierarchical 
 * name, such as "a", "a.b", "a.b.c" or similar.
 *
 * @param  {string} name
 * @return {Object}
 */
Manager.prototype.getLogger = function(name) {
	var parts = name.split('.');
	var currentName = '';
	var prevLogger = this.root;
	for (var i = 1, len = parts.length; i <= len; i++) {
		currentName = parts.slice(0, i).join('.');
		if (!this._loggers[currentName]) {
			this._loggers[currentName] = new Logger(this, prevLogger, currentName);
		}
		prevLogger = this._loggers[currentName];
	}

	return this._loggers[name];
};

/**
 *  Removes all the loggers.
 */
Manager.prototype.clear = function() {
	var names = Object.keys(this._loggers);
	var name = '';

	for (var i = 0, len = names.length; i < len; i++) {
		name = names[i];
		this._loggers[name] = null;
		delete this._loggers[name];
	}
	this.root = null;
};

var manager = new Manager();
manager.root = new Logger(manager, null, 'root', Logger.WARNING);


var baseExports = {
	NOTSET:   Logger.NOTSET,
	DEBUG:    Logger.DEBUG,
	INFO:     Logger.INFO,
	WARNING:  Logger.WARNING,
	ERROR:    Logger.ERROR,
	CRITICAL: Logger.CRITICAL,

	getLevelName: Logger.getLevelName,

	getLoggerClass: function() {
		return Logger;
	},

	getLogger: function(name) {
		name = name || '';

		if (!name) {
			return manager.root;
		} else {
			return manager.getLogger(name);
		}
	},

	Formatter: Formatter,

	_test_reset: reset // For tests only.
};

module.exports = Object.assign(baseExports, handlers);

/** @private */
function reset() {
	manager.clear();
	manager.root = new Logger(manager, null, 'root', Logger.WARNING);
}