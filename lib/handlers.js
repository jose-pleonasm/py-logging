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
}

Handler.prototype.setLevel = function(level) {
	if (Logger.getLevelName(level) === '') {
		throw new Error('[Invalid argument] Unknown level: \'' + level + '\'.');
	}

	this._level = level;
};

Handler.prototype.format = function(record) {
	throw new Error('Not implemented');
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

ConsoleHandler.prototype.format = function(record) {
	return '[' + Logger.getLevelName(record.level) + '] ' + record.msg;
};

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

FileHandler.prototype.format = function(record) {
	return (new Date()).toISOString()
		+ ' ' + Logger.getLevelName(record.level)
		+ ' ' + record.msg
		+ '\n';
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
