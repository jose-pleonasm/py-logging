var util = require('util');
var Logger = require('./Logger');

/**
 * Default formatter.
 */
function Formatter() {
	this._format = '%(created) %(name) [%(levelname)] %(message) %(test)';
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
		Formatter: Formatter,
		Handler: Handler,
		ConsoleHandler: ConsoleHandler,
		FileHandler: FileHandler
	};
}
