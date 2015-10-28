
/**
 * @typedef {Object} logging~LogRecord
 * @property {number} created Time when this record was created.
 * @property {string} name Name of the logger.
 * @property {number} levelno Numeric logging level.
 * @property {string} levelname Text logging level.
 * @property {string} message The logged message.
 * @property {Object=} error The logged error.
 * @property {Object=} extra Extra data.
 */

/**
 * @constructor Logger
 * @param {Object} manager
 * @param {Object} parent
 * @param {string} name
 * @param {number=} level
 */
function Logger(manager, parent, name, level) {
	level = level || Logger.NOTSET;

	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level \'' + level + '\'.');
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
	 * If this evaluates to true, events logged to this logger will be ignored.
	 * @type {boolean}
	 */
	this.disabled = false;

	/**
	 * If this evaluates to true, events logged to this logger will be passed to the handlers of higher level loggers.
	 * @type {boolean}
	 */
	this.propagate = true;
}

Logger.NOTSET   = 0;
Logger.DEBUG    = 10;
Logger.INFO     = 20;
Logger.WARNING  = 30;
Logger.ERROR    = 40;
Logger.CRITICAL = 50;

/**
 * Return the textual representation of logging level.
 *
 * @param  {number} level
 * @return {string}
 */
Logger.getLevelName = function(level) {
	var levelName = '';

	if (level === Logger.DEBUG) {
		levelName = 'DEBUG';
	} else if (level === Logger.INFO) {
		levelName = 'INFO';
	} else if (level === Logger.WARNING) {
		levelName = 'WARNING';
	} else if (level === Logger.ERROR) {
		levelName = 'ERROR';
	} else if (level === Logger.CRITICAL) {
		levelName = 'CRITICAL';
	} else if (level === Logger.NOTSET) {
		levelName = 'NOTSET';
	}

	return levelName;
};

/**
 * Return the name of this logger.
 *
 * @return {string}
 */
Logger.prototype.getName = function() {
	return this._name;
};

/**
 * Return a logger which is a descendant to this one.
 *
 * @param  {string} suffix
 * @return {Object}
 */
Logger.prototype.getChild = function(suffix) {
	if (!suffix) {
		throw new Error('[Invalid argument] Argument suffix must be specified.');
	}
	var base = this._name === 'root' ? '' : this._name + '.';
	return this._manager.getLogger(base + suffix);
};

/**
 * Return the effective level for this logger.
 *
 * @return {number}
 */
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

/**
 * Is this logger enabled for specified level?
 *
 * @param  {number}  level
 * @return {boolean}
 */
Logger.prototype.isEnabledFor = function(level) {
	return !this.disabled && level >= this.getEffectiveLevel();
};

/**
 * Set the logging level of this logger.
 *
 * @param {number} level
 */
Logger.prototype.setLevel = function(level) {
	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level \'' + level + '\'.');
	}

	this._level = level;
};

/**
 * Add the specified handler to this logger.
 *
 * @param {Object} handler
 */
Logger.prototype.addHandler = function(handler) {
	if (typeof handler !== 'object') {
		throw new Error('[Invalid argument] Argument handler must be an object.');
	}

	this._handlers.push(handler);
};

/**
 * Remove the specified handler from this logger.
 *
 * @param  {Object} handler
 */
Logger.prototype.removeHandler = function(handler) {
	var index = this._handlers.indexOf(handler);
	if (index > -1) {
		this._handlers.splice(index, 1);
	}
};

/**
 * Log msg with severity 'DEBUG'.
 *
 * @param  {string} msg
 * @param  {Object=} error
 * @param  {Object=} extra
 */
Logger.prototype.debug = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	this._log(Logger.DEBUG, msg, error, extra);
};

/**
 * Log msg with severity 'INFO'.
 *
 * @param  {string} msg
 * @param  {Object=} error
 * @param  {Object=} extra
 */
Logger.prototype.info = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	this._log(Logger.INFO, msg, error, extra);
};

/**
 * Log msg with severity 'WARNING'.
 *
 * @param  {string} msg
 * @param  {Object=} error
 * @param  {Object=} extra
 */
Logger.prototype.warning = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	this._log(Logger.WARNING, msg, error, extra);
};

/**
 * Log msg with severity 'ERROR'.
 *
 * @param  {string} msg
 * @param  {Object=} error
 * @param  {Object=} extra
 */
Logger.prototype.error = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	this._log(Logger.ERROR, msg, error, extra);
};

/**
 * Log msg with severity 'CRITICAL'.
 *
 * @param  {string} msg
 * @param  {Object=} error
 * @param  {Object=} extra
 */
Logger.prototype.critical = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	this._log(Logger.CRITICAL, msg, error, extra);
};

/**
 * Return the text representation of this logger.
 *
 * @return {string}
 */
Logger.prototype.toString = function() {
	return '[object logging.Logger]';
};

/**
 * Create a LogRecord object.
 *
 * @param  {number} level
 * @param  {string} msg
 * @param  {Object=} error
 * @param  {Object=} extra
 * @return {logging~LogRecord}
 */
Logger.prototype.makeRecord = function(level, msg, error, extra) {
	error = error || null;
	extra = extra || null;

	var record = {
		created: Date.now(),
		name: this._name,
		levelno: level,
		levelname: Logger.getLevelName(level),
		message: msg
	};
	if (error) {
		record.error = error;
	}
	if (extra) {
		record = Object.assign(record, extra);
	}

	return record;
};

/**
 * @private
 * @param  {number} level
 * @param  {string} msg
 * @param  {Object=} error
 * @param  {Object=} extra
 */
Logger.prototype._log = function(level, msg, error, extra) {
	if (this.isEnabledFor(level)) {
		this._callHandlers(this.makeRecord(level, msg, error, extra));
	}
};

/**
 * @private
 * @param  {logging~LogRecord} record
 */
Logger.prototype._callHandlers = function(record) {
	var logger = this;

	while (logger) {
		logger._handlers.forEach(function(handler) {
			if (handler.isEnabledFor(record.levelno)) {
				handler.handle(record);
			}
		});

		if (this.propagate) {
			logger = logger._parent;
		} else {
			logger = null;
		}
	}
};


module.exports = Logger;
