var util = require('util');
var Filterer = require('./Filterer');

/**
 * @typedef {Object} module:py-logging.LogRecord
 * @property {number} created Time when this record was created.
 * @property {string} name Name of the logger.
 * @property {number} levelno Numeric logging level.
 * @property {string} levelname Text logging level.
 * @property {string} message The logged message.
 * @property {Object} [error] The logged error.
 * @property {Object} [extra] Extra data.
 * @property {number} [pid] Process ID (if available).
 * @property {string} [processtitle] Process title (if available).
 */

/**
 * @constructor Logger
 * @extends Filterer
 * @param {Object} manager
 * @param {Object} parent
 * @param {string} name
 * @param {number} [level]
 */
function Logger(manager, parent, name, level) {
	level = level || Logger.NOTSET;

	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level \'' + level + '\'.');
	}

	Filterer.call(this);

	/**
	 * Instance of manager, which holds the hierarchy of loggers.
	 *
	 * @private
	 * @type {Object}
	 */
	this._manager = manager;

	/**
	 * Parent logger.
	 *
	 * @private
	 * @type {Object}
	 */
	this._parent = parent;

	/**
	 * Name of this logger.
	 *
	 * @private
	 * @type {string}
	 */
	this._name = name;

	/**
	 * The threshold for this logger.
	 *
	 * @private
	 * @type {number}
	 */
	this._level = level;

	/**
	 * Array of set handlers.
	 *
	 * @private
	 * @type {Array}
	 */
	this._handlers = [];

	/**
	 * If this evaluates to true, events logged to this logger will be ignored.
	 *
	 * @memberof Logger.prototype
	 * @type {boolean}
	 */
	this.disabled = false;

	/**
	 * If this evaluates to true, events logged to this logger will be passed
	 * to the handlers of higher level loggers.
	 *
	 * @memberof Logger.prototype
	 * @type {boolean}
	 */
	this.propagate = true;
}
util.inherits(Logger, Filterer);

Logger.NOTSET   = 0;
Logger.DEBUG    = 10;
Logger.INFO     = 20;
Logger.WARNING  = 30;
Logger.ERROR    = 40;
Logger.CRITICAL = 50;

/**
 * Return the textual representation of logging level.
 *
 * @static
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
 * Return value of the level name.
 *
 * @static
 * @param  {string} levelName
 * @return {number}
 */
Logger.getLevelByName = function(levelName) {
	var level = '';

	if (levelName === 'DEBUG') {
		level = Logger.DEBUG;
	} else if (levelName === 'INFO') {
		level = Logger.INFO;
	} else if (levelName === 'WARNING') {
		level = Logger.WARNING;
	} else if (levelName === 'ERROR') {
		level = Logger.ERROR;
	} else if (levelName === 'CRITICAL') {
		level = Logger.CRITICAL;
	} else if (levelName === 'NOTSET') {
		level = Logger.NOTSET;
	}

	return level;
};

/**
 * Return the text representation of this logger.
 *
 * @return {string}
 */
Logger.prototype.toString = function() {
	return '[object Logger <' + this._name + '>]';
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
	return level >= this.getEffectiveLevel();
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
 * @param {Handler} handler
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
 * @param  {Handler} handler
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
 * @param  {Object} [error]
 * @param  {Object} [extra]
 */
Logger.prototype.debug = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	if (this.isEnabledFor(Logger.DEBUG)) {
		this._log(Logger.DEBUG, msg, error, extra);
	}
};

/**
 * Log msg with severity 'INFO'.
 *
 * @param  {string} msg
 * @param  {Object} [error]
 * @param  {Object} [extra]
 */
Logger.prototype.info = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	if (this.isEnabledFor(Logger.INFO)) {
		this._log(Logger.INFO, msg, error, extra);
	}
};

/**
 * Log msg with severity 'WARNING'.
 *
 * @param  {string} msg
 * @param  {Object} [error]
 * @param  {Object} [extra]
 */
Logger.prototype.warning = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	if (this.isEnabledFor(Logger.WARNING)) {
		this._log(Logger.WARNING, msg, error, extra);
	}
};

/**
 * Log msg with severity 'ERROR'.
 *
 * @param  {string} msg
 * @param  {Object} [error]
 * @param  {Object} [extra]
 */
Logger.prototype.error = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	if (this.isEnabledFor(Logger.ERROR)) {
		this._log(Logger.ERROR, msg, error, extra);
	}
};

/**
 * Log msg with severity 'CRITICAL'.
 *
 * @param  {string} msg
 * @param  {Object} [error]
 * @param  {Object} [extra]
 */
Logger.prototype.critical = function(msg, error, extra) {
	error = error || null;
	extra = extra || null;

	if (this.isEnabledFor(Logger.CRITICAL)) {
		this._log(Logger.CRITICAL, msg, error, extra);
	}
};

/**
 * Log msg with specified severity.
 *
 * @param  {number} level
 * @param  {string} msg
 * @param  {Object} [error]
 * @param  {Object} [extra]
 */
Logger.prototype.log = function(level, msg, error, extra) {
	error = error || null;
	extra = extra || null;

	if (this.isEnabledFor(level)) {
		this._log(level, msg, error, extra);
	}
};

/**
 * Create a LogRecord object.
 *
 * @param  {number} level
 * @param  {string} msg
 * @param  {Object} [error]
 * @param  {Object} [extra]
 * @return {module:py-logging.LogRecord}
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
	if (global.process && global.process.pid) {
		record.pid = global.process.pid;
		record.processtitle = global.process.title;
	}
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
 * @param  {Object} [error]
 * @param  {Object} [extra]
 */
Logger.prototype._log = function(level, msg, error, extra) {
	var record = this.makeRecord(level, msg, error, extra);

	if (!this.disabled && this.filter(record)) {
		this._callHandlers(record);
	}
};

/**
 * @private
 * @param  {module:py-logging.LogRecord} record
 */
Logger.prototype._callHandlers = function(record) {
	var logger = this;

	while (logger) {
		logger._handlers.forEach(function(handler) {
			if (handler.isEnabledFor(record.levelno)) {
				handler.handle(record);
			}
		});

		if (logger.propagate) {
			logger = logger._parent;
		} else {
			logger = null;
		}
	}
};


module.exports = Logger;
