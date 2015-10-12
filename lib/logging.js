var Logger = require('./Logger');
var handlers = require('./handlers');

/**
 * Default formatter.
 */
function Formatter(format) {
	format = format || '%(created) %(name) [%(levelname)] %(message)';

	this._format = format;
}

Formatter.prototype.formatTime = function(record) {
	return (new Date(record.created)).toISOString();
};

Formatter.prototype.format = function(record) {
	var cb = this._getReplacement.bind(this, record);
	var s = this._format.replace(/%\(([a-z]+)\)/g, cb);
	return s;
};

Formatter.prototype._getReplacement = function(record, match, p1) {
	var r = '';

	if (record[p1]) {
		if (p1 === 'created') {
			r = this.formatTime(record);
		} else {
			r = record[p1];
		}
	}

	return r;
};

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


if (typeof module !== 'undefined' && module.exports) {
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
}

function reset() {
	manager.clear();
	root = new Logger(manager, null, 'root', Logger.WARNING);
	manager.setRoot(root);
}