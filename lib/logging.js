var Logger = require('./Logger');
var Formatter = require('./Formatter');
var handlers = require('./handlers');

/**
 * Manager, which holds the hierarchy of loggers.
 */
function Manager() {
	this._root = null;
	this._loggers = {};
}

Manager.prototype.setRoot = function(logger) {
	this._root = logger;
};

Manager.prototype.getLogger = function(name) {
	var parts = name.split('.');
	var currentName = '';
	var prevLogger = this._root;
	for (var i = 1, len = parts.length; i <= len; i++) {
		currentName = parts.slice(0, i).join('.');
		if (!this._loggers[currentName]) {
			this._loggers[currentName] = new Logger(this, prevLogger, currentName);
		}
		prevLogger = this._loggers[currentName];
	}

	return this._loggers[name];
};

Manager.prototype.clear = function() {
	var names = Object.keys(this._loggers);
	var name = '';

	for (var i = 0, len = names.length; i < len; i++) {
		name = names[i];
		this._loggers[name] = null;
		delete this._loggers[name];
	}
	this._root = null;
};

var manager = new Manager();
var root = new Logger(manager, null, 'root', Logger.WARNING);
manager.setRoot(root);


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
			return root;
		} else {
			return manager.getLogger(name);
		}
	},

	Formatter: Formatter,

	_test_reset: reset // For tests only.
};

module.exports = Object.assign(baseExports, handlers);

function reset() {
	manager.clear();
	root = new Logger(manager, null, 'root', Logger.WARNING);
	manager.setRoot(root);
}