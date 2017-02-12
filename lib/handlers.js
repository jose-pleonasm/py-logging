var util = require('util');
var Handler = require('./Handler');

/**
 * Console handler.
 *
 * @constructor ConsoleHandler
 * @extends Handler
 * @param {number} [level]
 */
function ConsoleHandler(level) {
	Handler.call(this, level);
}
util.inherits(ConsoleHandler, Handler);

/** @inheritdoc */
ConsoleHandler.prototype.emit = function(record) {
	try {
		console.log(this.format(record));
	}
	catch (err) {
		this.handleError(err, record);
	}
};


/**
 * File handler.
 *
 * @constructor FileHandler
 * @extends Handler
 * @param {string} filename
 * @param {string} [encoding]
 */
function FileHandler(filename, encoding) {
	encoding = encoding || '';

	Handler.call(this);

	/**
	 * @private
	 * @type {string}
	 */
	this._filename = filename;

	/**
	 * @private
	 * @type {string}
	 */
	this._encoding = encoding;
}
util.inherits(FileHandler, Handler);

/** @inheritdoc */
FileHandler.prototype.emit = function(record) {
	try {
		var data = this.format(record) + '\n';
		var options = { encoding: this._encoding };
		var callback = (function fileHandlerEmitCallback(err) {
			if (err) {
				this.handleError(err, record);
			}
		}).bind(this);

		getFs().appendFile(this._filename, data, options, callback);
	}
	catch (err) {
		this.handleError(err, record);
	}
};


/**
 * Handler for logging to a set of files, which switches from one file
 * to the next when the current file reaches a certain size.
 *
 * @constructor RotatingFileHandler
 * @extends Handler
 * @param {string} filename
 * @param {number} [maxBytes]
 * @param {number} [backupCount]
 * @param {string} [encoding]
 */
function RotatingFileHandler(filename, maxBytes, backupCount, encoding) {
	maxBytes = typeof maxBytes === 'undefined' ? 4 * 1024 : maxBytes;
	backupCount = typeof backupCount === 'undefined' ? 5 : backupCount;
	encoding = encoding || '';

	Handler.call(this);

	/**
	 * @private
	 * @type {string}
	 */
	this._filename = filename;

	/**
	 * @private
	 * @type {number}
	 */
	this._maxBytes = maxBytes;

	/**
	 * @private
	 * @type {number}
	 */
	this._backupCount = backupCount;

	/**
	 * @private
	 * @type {string}
	 */
	this._encoding = encoding;

	/**
	 * @private
	 * @type {Array}
	 */
	this._queue = [];

	/**
	 * @private
	 * @type {boolean}
	 */
	this._processing = false;

	/**
	 * @private
	 * @type {Object}
	 */
	this._fs = getFs();

	this.format = this.format.bind(this);
	this.handleError = this.handleError.bind(this);
	this._processQueue = this._processQueue.bind(this);
	this._finishTask = this._finishTask.bind(this);
	this._handleRollover = this._handleRollover.bind(this);
	this._makeBackup = this._makeBackup.bind(this);
}
util.inherits(RotatingFileHandler, Handler);

/**
 * @type {number}
 */
RotatingFileHandler.queueLimit = 1000;

/**
 * Output the record to the file, catering for rollover.
 *
 * @param  {module:py-logging.LogRecord} record
 * @throws {Error} When there are too many unhandled log events.
 */
RotatingFileHandler.prototype.emit = function(record) {
	try {
		this._queue.push(record);
		this._processQueue();
	}
	catch (err) {
		this.handleError(err, record);
	}
};

/**
 * Determine if rollover should occur.
 *
 * @param  {module:py-logging.LogRecord} record
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
			.then(this._processQueue)
			.catch(this.handleError);
	}
};

/**
 * Processing the log event from queue.
 *
 * @private
 * @param  {module:py-logging.LogRecord} record
 * @return {Promise}
 */
RotatingFileHandler.prototype._runTask = function(record) {
	this._processing = true;
	return this.shouldRollover(record)
		.then(this._handleRollover)
		.then(FileHandler.prototype.emit.bind(this, record));
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

/**
 * @constructor SyncRotatingFileHandler
 * @extends Handler
 * @param {string} filename
 * @param {number} [maxBytes]
 * @param {number} [backupCount]
 * @param {string} [encoding]
 */
function SyncRotatingFileHandler(filename, maxBytes, backupCount, encoding) {
	maxBytes = typeof maxBytes === 'undefined' ? 4 * 1024 : maxBytes;
	backupCount = typeof backupCount === 'undefined' ? 5 : backupCount;
	encoding = encoding || '';

	Handler.call(this);

	/**
	 * @private
	 * @type {string}
	 */
	this._filename = filename;

	/**
	 * @private
	 * @type {number}
	 */
	this._maxBytes = maxBytes;

	/**
	 * @private
	 * @type {number}
	 */
	this._backupCount = backupCount;

	/**
	 * @private
	 * @type {string}
	 */
	this._encoding = encoding;

	/**
	 * @private
	 * @type {Object}
	 */
	this._fs = getFs();
}
util.inherits(SyncRotatingFileHandler, Handler);

/**
 * @param  {module:py-logging.LogRecord} record
 */
SyncRotatingFileHandler.prototype.emit = function(record) {
	try {
		if (this.shouldRollover(record)) {
			this.doRollover();
		}

		FileHandler.prototype.emit.call(this, record);
	}
	catch (err) {
		this.handleError(err, record);
	}
};

/**
 * @param  {module:py-logging.LogRecord} record
 * @return {boolean}
 */
SyncRotatingFileHandler.prototype.shouldRollover = function(record) {
	if (this._maxBytes === 0) {
		return false;
	}

	try {
		var stats = this._fs.statSync(this._filename);
	}
	catch (err) {
		if (err.code === 'ENOENT') {
			return false;
		}
		throw err;
	}

	var s = this.format(record) + '\n';
	return (stats.size + s.length) > this._maxBytes;
};

/**
 * @return {boolean}
 */
SyncRotatingFileHandler.prototype.doRollover = function() {
	if (this._backupCount === 0) {
		return;
	}

	for (var i = this._backupCount - 1; i > 0; i--) {
		var sfn = this._filename + '.' + i;
		var dfn = this._filename + '.' + (i + 1);

		if (fileExistsSync(this._fs, sfn)) {
			if (fileExistsSync(this._fs, dfn)) {
				this._fs.unlinkSync(dfn);
			}
			this._fs.renameSync(sfn, dfn);
		}
	}
	dfn = this._filename + '.' + 1;
	if (fileExistsSync(this._fs, dfn)) {
		this._fs.unlinkSync(dfn);
	}
	if (fileExistsSync(this._fs, this._filename)) {
		this._fs.renameSync(this._filename, dfn);
	}
};

/**
 * @constructor BrowserBasicHttpHandler
 * @extends Handler
 * @param {string} url
 */
function BrowserBasicHttpHandler(baseUrl) {
	if (typeof Image === 'undefined') {
		throw new Error('[Logic error] There is no "Image" function.');
	}

	Handler.call(this);

	/**
	 * @private
	 * @type {string}
	 */
	this._baseUrl = baseUrl;

	/**
	 * @private
	 * @type {boolean}
	 */
	this._containsQS = baseUrl.indexOf('?') > -1;
}
util.inherits(BrowserBasicHttpHandler, Handler);

/**
 * @param  {module:py-logging.LogRecord} record
 */
BrowserBasicHttpHandler.prototype.emit = function(record) {
	try {
		var qs = this.format(record);
		var url = this._baseUrl
				+ (this._containsQS ? '&' : '?')
				+ qs;

		(new Image()).src = url;
	}
	catch (err) {
		this.handleError(err, record);
	}
};


module.exports = {
	Handler: Handler,
	ConsoleHandler: ConsoleHandler,
	FileHandler: FileHandler,
	RotatingFileHandler: RotatingFileHandler,
	SyncRotatingFileHandler: SyncRotatingFileHandler,
	BrowserBasicHttpHandler: BrowserBasicHttpHandler
};


//
// proxies
//
function getFs() {
	return require('fs');
}

//
// helpers
//
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

function fileExistsSync(fs, path) {
	try {
		fs.statSync(path);
		return true;
	}
	catch (err) {
		if (err.code === 'ENOENT') {
			return false;
		}
		throw err;
	}
}
