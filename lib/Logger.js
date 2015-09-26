
function Logger(manager, parent, name, level) {
	level = level || Logger.NOTSET;

	/**
	 * Loggers manager.
	 * @type {Object}
	 */
	this._manager = manager;

	/**
	 * Parent logger.
	 * @type {Object}
	 */
	this._parent = parent;

	/**
	 * Name of this logger instance.
	 * @type {string}
	 */
	this._name = name;

	/**
	 * The threshold for this logger.
	 * @type {number}
	 */
	this._level = level;

	/**
	 * Array of set handlers.
	 * @type {Array}
	 */
	this._handlers = [];

	/**
	 * @type {boolean}
	 */
	this._disabled = false;

	/**
	 * @type {boolean}
	 */
	this._propagate = true;
}

Logger.NOTSET   = 0;
Logger.DEBUG    = 10;
Logger.INFO     = 20;
Logger.WARNING  = 30;
Logger.ERROR    = 40;
Logger.CRITICAL = 50;

Logger.getLevelName = function(level) {
	var levelName = '';

	if (level === Logger.DEBUG) {
		levelName = 'debug';
	} else if (level === Logger.INFO) {
		levelName = 'info';
	} else if (level === Logger.WARNING) {
		levelName = 'warning';
	} else if (level === Logger.ERROR) {
		levelName = 'error';
	} else if (level === Logger.CRITICAL) {
		levelName = 'critical';
	}

	return levelName;
};

Logger.prototype.getName = function() {
	return this._name;
};

Logger.prototype.getChild = function(suffix) {
	if (!suffix) {
		throw new Error('[Invalid argument] Argument suffix must be specified.');
	}
	var base = this._name === 'root' ? '' : this._name + '.';
	return this._manager.getLogger(base + suffix);
};

Logger.prototype.setLevel = function(level) {
	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level: \'' + level + '\'.');
	}

	this._level = level;
};

Logger.prototype.addHandler = function(handler) {
	if (typeof handler !== 'function') {
		throw new Error('[Invalid argument] Argument handler must be a function.');
	}

	this._handlers.push(handler);
};

Logger.prototype.removeHandler = function(handler) {
	var index = this._handlers.indexOf(handler);
	if (index > -1) {
		this._handlers.splice(index, 1);
	}
};

Logger.prototype.debug = function(msg) {
	this._log(Logger.DEBUG, msg);
};

Logger.prototype.info = function(msg) {
	this._log(Logger.INFO, msg);
};

Logger.prototype.warning = function(msg) {
	this._log(Logger.WARNING, msg);
};

Logger.prototype.error = function(msg) {
	this._log(Logger.ERROR, msg);
};

Logger.prototype.critical = function(msg) {
	this._log(Logger.CRITICAL, msg);
};

Logger.prototype.toString = function() {
	return '[object logging.Logger]';
};

Logger.prototype._log = function(level, msg) {
	if (this._disabled || level < this._level) {
		return;
	}

	this._callHandlers({level: level, msg: msg});

	if (this._propagate && this._parent) {
		this._callParent(level, msg);
	}
};

Logger.prototype._callHandlers = function(record) {
	this._handlers.forEach(function(handler) {
		handler(record);
	});
};

Logger.prototype._callParent = function(level, msg) {
	this._parent[Logger.getLevelName(level)](msg);
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Logger;
}
