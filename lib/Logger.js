
function Logger(manager, parent, name, level) {
	level = level || Logger.NOTSET;

	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level: \'' + level + '\'.');
	}

	/**
	 * Instance of manager, which holds the hierarchy of loggers.
	 * @type {Object}
	 */
	this._manager = manager;

	/**
	 * Parent logger.
	 * @type {Object}
	 */
	this._parent = parent;

	/**
	 * Name of this logger.
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
	} else if (level === Logger.NOTSET) {
		levelName = 'notset';
	}

	return levelName;
};

Logger.prototype.getName = function() {
	return this._name;
};

Logger.prototype.getEffectiveLevel = function() {
	var logger = this;

	while (logger) {
		if (logger._level) {
			return logger._level;
		}
		logger = logger._parent;
	}

	return Logger.NOTSET;
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
	if (typeof handler !== 'object') {
		throw new Error('[Invalid argument] Argument handler must be an object.');
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

Logger.prototype.makeRecord = function(level, msg) {
	return {
		name: this._name,
		level: level,
		msg: msg
	};
};

Logger.prototype._log = function(level, msg) {
	if (this._disabled || level < this._level) {
		return;
	}

	this._callHandlers(this.makeRecord(level, msg));
};

Logger.prototype._callHandlers = function(record) {
	var logger = this;

	while (logger) {
		logger._handlers.forEach(function(handler) {
			handler.handle(record);
		});

		if (this._propagate) {
			logger = logger._parent;
		} else {
			logger = null;
		}
	}
};

Logger.prototype._callParent = function(level, msg) {
	this._parent[Logger.getLevelName(level)](msg);
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Logger;
}
