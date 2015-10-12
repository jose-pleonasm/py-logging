var util = require('util');
var Logger = require('./Logger');

/**
 * An abstract handler.
 */
function Handler(level) {
	level = level || Logger.NOTSET;

	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level: \'' + level + '\'.');
	}

	this._level = level;

	this._formatter = null;
}

Handler.prototype.setLevel = function(level) {
	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level: \'' + level + '\'.');
	}

	this._level = level;
};

Handler.prototype.setFormatter = function(formatter) {
	this._formatter = formatter;
};

Handler.prototype.format = function(record) {
	if (!this._formatter) {
		throw new Error('[Invalid state] Formatter is not set.');
	}
	return this._formatter.format(record);
};

Handler.prototype.handle = function(record) {
	throw new Error('Not implemented');
};

/**
 * Console handler.
 */
function ConsoleHandler(level) {
	Handler.call(this, level);
}
util.inherits(ConsoleHandler, Handler);

ConsoleHandler.prototype.handle = function(record) {
	if (record.level < this._level) {
		return;
	}

	console.log(this.format(record));
};

/**
 * File handler.
 */
function FileHandler(filename, encoding) {
	encoding = encoding || '';

	Handler.call(this);

	this._filename = filename;

	this._encoding = encoding;
}
util.inherits(FileHandler, Handler);

FileHandler.getFs = function() {
	return require('fs');
};

FileHandler.prototype.handle = function(record) {
	if (record.level < this._level) {
		return;
	}

	var record = this.format(record);
	FileHandler.getFs().appendFile(this._filename, record, this._encoding);
};


if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		Handler: Handler,
		ConsoleHandler: ConsoleHandler,
		FileHandler: FileHandler
	};
}
