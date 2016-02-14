var util = require('util');
var Logger = require('./Logger');

/**
 * An abstract handler.
 *
 * @constructor Handler
 * @param {number=} level
 */
function Handler(level) {
	level = level || Logger.NOTSET;

	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level \'' + level + '\'.');
	}

	/** @type {number} */
	this._level = level;

	/** @type {Object} */
	this._formatter = null;
}

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
 * @param {Object} formatter
 */
Handler.prototype.setFormatter = function(formatter) {
	this._formatter = formatter;
};

/**
 * Format the specified record.
 *
 * @param  {logging~LogRecord} record
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
 * @param  {logging~LogRecord} record
 * @return {logging~LogRecord}
 */
Handler.prototype.handle = function(record) {
	this.acquire();
	try {
		this.emit(record);
	}
	catch (err) {
		this.release();
		throw err;
	}
	this.release();

	return record;
};

Handler.prototype.acquire = function() {};

Handler.prototype.release = function() {};

/**
 * Do whatever it takes to actually log the specified logging record.
 *
 * @param  {logging~LogRecord} record
 */
Handler.prototype.emit = function(record) {
	throw new Error('Not implemented');
};

/**
 * Console handler.
 *
 * @constructor ConsoleHandler
 * @extends Handler
 * @param {number=} level
 */
function ConsoleHandler(level) {
	Handler.call(this, level);
}
util.inherits(ConsoleHandler, Handler);

/** @inheritdoc */
ConsoleHandler.prototype.emit = function(record) {
	console.log(this.format(record));
};

/**
 * File handler.
 *
 * @constructor FileHandler
 * @extends Handler
 * @param {string} filename
 * @param {string=} encoding
 */
function FileHandler(filename, encoding) {
	encoding = encoding || '';

	Handler.call(this);

	/** @type {string} */
	this._filename = filename;

	/** @type {string} */
	this._encoding = encoding;
}
util.inherits(FileHandler, Handler);

/** @inheritdoc */
FileHandler.prototype.emit = function(record) {
	var record = this.format(record) + '\n';
	FileHandler._getFs().appendFile(this._filename, record, this._encoding);
};

/**
 * @static
 * @type {Object}
 */
FileHandler._fs = null;

/**
 * @static
 * @private
 * @return {Object}
 */
FileHandler._getFs = function() {
	if (!FileHandler._fs) {
		FileHandler._fs = require('fs');
	}
	return FileHandler._fs;
};


module.exports = {
	Handler: Handler,
	ConsoleHandler: ConsoleHandler,
	FileHandler: FileHandler
};
