var util = require('util');
var Filterer = require('./Filterer');
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

	Filterer.call(this);

	/** @type {number} */
	this._level = level;

	/** @type {Object} */
	this._formatter = null;
}
util.inherits(Handler, Filterer);

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
 * Handle errors which occur during an emit() call.
 *
 * @param  {Error} error
 * @param  {logging~LogRecord=} record
 */
Handler.prototype.handleError = function(error, record) {
	record = record || null;

	if (typeof console === 'object') {
		console.error(error);
	}
};


// proxies
function getFs() {
	return require('fs');
}

// helpers
function fileExists(fs, path) {
	return new Promise(function(resolve, reject) {
		fs.stat(path, function(err, stats) {
			if (err) {
				if (err.code === 'ENOENT') {
					resolve(false);
				} else {
					reject(err);
				}
				return;
			}
			resolve(true);
		});
	});
}

function fileRemove(fs, path) {
	return new Promise(function(resolve, reject) {
		fs.unlink(path, function(err) {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}

function fileRename(fs, oldPath, newPath) {
	return new Promise(function(resolve, reject) {
		fs.rename(oldPath, newPath, function(err) {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
}


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
	var s = this.format(record) + '\n';
	getFs().appendFile(this._filename, s, this._encoding);
};


/**
 * Handler for logging to a set of files, which switches from one file
 * to the next when the current file reaches a certain size.
 *
 * @constructor RotatingFileHandler
 * @param {string} filename
 * @param {number=} maxBytes
 * @param {number=} backupCount
 * @param {string=} encoding
 */
function RotatingFileHandler(filename, maxBytes, backupCount, encoding) {
	maxBytes = typeof maxBytes === 'undefined' ? 4 * 1024 : maxBytes;
	backupCount = typeof backupCount === 'undefined' ? 5 : backupCount;
	encoding = encoding || '';

	Handler.call(this);

	/** @type {string} */
	this._filename = filename;

	/** @type {number} */
	this._maxBytes = maxBytes;

	/** @type {number} */
	this._backupCount = backupCount;

	/** @type {string} */
	this._encoding = encoding;

	/** @type {Array} */
	this._queue = [];

	/** @type {boolean} */
	this._processing = false;

	/** @type {Object} */
	this._fs = getFs();

	this.format = this.format.bind(this);
	this.handleError = this.handleError.bind(this);
	this._processQueue = this._processQueue.bind(this);
	this._finishTask = this._finishTask.bind(this);
	this._handleRollover = this._handleRollover.bind(this);
	this._makeBackup = this._makeBackup.bind(this);
}
util.inherits(RotatingFileHandler, Handler);

/** @type {number} */
RotatingFileHandler.queueLimit = 500;

/**
 * Output the record to the file, catering for rollover.
 *
 * @param  {logging~LogRecord} record
 * @throws {Error} When there are too many unhandled log events.
 */
RotatingFileHandler.prototype.emit = function(record) {
	this._queue.push(record);
	this._processQueue();
};

/**
 * Determine if rollover should occur.
 *
 * @param  {logging~LogRecord} record
 * @return {Promise}
 */
RotatingFileHandler.prototype.shouldRollover = function(record) {
	if (this._maxBytes > 0) {
		var fs = this._fs;
		var filename = this._filename;
		var maxBytes = this._maxBytes;
		var format = this.format;

		return new Promise(function(resolve, reject) {
			fs.stat(filename, function(err, stats) {
				if (err) {
					if (err.code === 'ENOENT') {
						resolve(false);
					} else {
						reject(err);
					}
					return;
				}

				var s = format(record) + '\n';
				resolve((stats.size + s.length) > maxBytes);
			});
		});
	}
	return Promise.resolve(false);
};

/**
 * Do a rollover.
 *
 * @return {Promise}
 */
RotatingFileHandler.prototype.doRollover = function() {
	if (this._backupCount > 0) {
		return this._moveBackups(this._backupCount - 1)
			.then(this._makeBackup)
	}
	return Promise.resolve();
};

/**
 * Processing the queue of log events.
 *
 * @private
 */
RotatingFileHandler.prototype._processQueue = function() {
	if (this._queue.length > RotatingFileHandler.queueLimit) {
		throw new Error('Too many records in queue.');
	}
	if (this._processing) {
		return;
	}

	var record = this._queue.shift();
	if (record) {
		this._runTask(record)
			.then(this._finishTask)
			.then(this._processQueue);
	}
};

/**
 * Processing the log event from queue.
 *
 * @private
 * @param  {logging~LogRecord} record
 * @return {Promise}
 */
RotatingFileHandler.prototype._runTask = function(record) {
	this._processing = true;
	return this.shouldRollover(record)
		.then(this._handleRollover)
		.then(FileHandler.prototype.emit.bind(this, record))
		.catch(this.handleError);
};

/**
 * Finish process of the log event from the queue.
 *
 * @private
 */
RotatingFileHandler.prototype._finishTask = function() {
	this._processing = false;
};

/**
 * @private
 * @param  {boolean} shouldRollover
 * @return {Promise}
 */
RotatingFileHandler.prototype._handleRollover = function(shouldRollover) {
	if (shouldRollover) {
		return this.doRollover();
	}
	return Promise.resolve();
};

/**
 * @private
 * @param  {number} count
 * @return {Promise}
 */
RotatingFileHandler.prototype._moveBackups = function(count) {
	return new Promise(function(resolve, reject) {
		this._moveBackupsLoop(this._fs, count, reject, resolve);
	}.bind(this));
};

/**
 * @private
 * @param  {Object}   fs
 * @param  {number}   number
 * @param  {Function} error
 * @param  {Function} done
 */
RotatingFileHandler.prototype._moveBackupsLoop = function(fs, number, error, done) {
	if (number < 1) {
		return done();
	}

	var next = this._moveBackupsLoop.bind(this, fs, number - 1, error, done);
	var sfn = this._filename + '.' + number;
	var dfn = this._filename + '.' + (number + 1);

	fileExists(fs, sfn)
		.then(function(sfnExists) {
			if (!sfnExists) {
				return Promise.resolve();
			}
			return fileExists(fs, dfn)
				.then(function(dfnExists) {
					if (!dfnExists) {
						return Promise.resolve();
					}
					return fileRemove(fs, dfn);
				})
				.then(function() {
					return fileRename(fs, sfn, dfn);
				});
		})
		.then(next)
		.catch(error);
};

/**
 * @private
 * @return {Promise}
 */
RotatingFileHandler.prototype._makeBackup = function() {
	var fs = this._fs;
	var filename = this._filename;
	var dfn = filename + '.' + 1;

	return fileExists(fs, dfn)
		.then(function(dfnExists) {
			if (!dfnExists) {
				return Promise.resolve();
			}
			return fileRemove(fs, dfn);
		})
		.then(function() {
			return fileExists(fs, filename)
				.then(function(fnExists) {
					if (!fnExists) {
						return Promise.resolve();
					}
					return fileRename(fs, filename, dfn);
				});
		});
};


module.exports = {
	Handler: Handler,
	ConsoleHandler: ConsoleHandler,
	FileHandler: FileHandler,
	RotatingFileHandler: RotatingFileHandler
};
