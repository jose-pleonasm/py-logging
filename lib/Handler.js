var util = require('util');
var Filterer = require('./Filterer');
var Logger = require('./Logger');

/**
 * An abstract handler.
 *
 * @constructor Handler
 * @extends Filterer
 * @param {number} [level]
 */
function Handler(level) {
	level = level || Logger.NOTSET;

	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level \'' + level + '\'.');
	}

	Filterer.call(this);

	/**
	 * @private
	 * @type {number}
	 */
	this._level = level;

	/**
	 * @private
	 * @type {Object}
	 */
	this._formatter = null;
}
util.inherits(Handler, Filterer);

/**
 * Return the text representation of this handler.
 *
 * @return {string}
 */
Handler.prototype.toString = function() {
	return '[object Handler]';
};

/**
 * Set the logging level of this handler.
 *
 * @param {number} level
 */
Handler.prototype.setLevel = function(level) {
	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level \'' + level + '\'.');
	}

	this._level = level;
};

/**
 * Is this handler enabled for specified level?
 *
 * @param  {number}  level
 * @return {boolean}
 */
Handler.prototype.isEnabledFor = function(level) {
	return level >= this._level;
};

/**
 * Set the formatter for this handler.
 *
 * @param {Formatter} formatter
 */
Handler.prototype.setFormatter = function(formatter) {
	this._formatter = formatter;
};

/**
 * Format the specified record.
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {string}
 */
Handler.prototype.format = function(record) {
	if (!this._formatter) {
		throw new Error('[Invalid state] Formatter is not set.');
	}
	return this._formatter.format(record);
};

/**
 * Handle the specified logging record.
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {module:py-logging.LogRecord}
 */
Handler.prototype.handle = function(record) {
	var rv = this.filter(record);

	if (rv) {
		this.acquire();
		try {
			this.emit(record);
		}
		catch (err) {
			this.release();
			throw err;
		}
		this.release();
	}

	return rv;
};

/**
 * @abstract
 */
Handler.prototype.acquire = function() {};

/**
 * @abstract
 */
Handler.prototype.release = function() {};

/**
 * Do whatever it takes to actually log the specified logging record.
 *
 * @abstract
 * @param  {module:py-logging.LogRecord} record
 */
Handler.prototype.emit = function(record) {
	throw new Error('Not implemented');
};

/**
 * Handle errors which occur during an emit() call.
 *
 * @param  {Error} error
 * @param  {module:py-logging.LogRecord} [record]
 */
Handler.prototype.handleError = function(error, record) {
	record = record || null;

	if (typeof console === 'object') {
		console.error('An error "'+ error.toString() + '" has occurred'
				+ (record
						? ' during handling the record "' + record.message + '"'
						: ''));
	}
};


module.exports = Handler;
