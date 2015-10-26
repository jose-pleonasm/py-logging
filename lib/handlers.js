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
		throw new Error('[Invalid argument] Unknown level: \'' + level + '\'.');
	}

	this._level = level;

	this._formatter = null;
}

/**
 * Set the logging level of this handler.
 *
 * @param {number} level
 */
Handler.prototype.setLevel = function(level) {
	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level: \'' + level + '\'.');
	}

	this._level = level;
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
 */
Handler.prototype.handle = function(record) {
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
ConsoleHandler.prototype.handle = function(record) {
	if (record.level < this._level) {
		return;
	}

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

	this._filename = filename;

	this._encoding = encoding;
}
util.inherits(FileHandler, Handler);

FileHandler._fs = null;

/**
 * @static
 * @return {Object}
 */
FileHandler.getFs = function() {
	if (!FileHandler._fs) {
		FileHandler._fs = require('fs');
	}
	return FileHandler._fs;
};

/** @inheritdoc */
FileHandler.prototype.handle = function(record) {
	if (record.level < this._level) {
		return;
	}

	var record = this.format(record) + '\n';
	FileHandler.getFs().appendFile(this._filename, record, this._encoding);
};


module.exports = {
	Handler: Handler,
	ConsoleHandler: ConsoleHandler,
	FileHandler: FileHandler
};
