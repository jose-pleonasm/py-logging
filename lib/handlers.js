var util = require('util');
var Handler = require('./Handler');


//------------------------------------------------------------------------------
//   StreamHandler
//------------------------------------------------------------------------------

/**
 * Base stream handler.
 *
 * A handler class which writes logging records, appropriately formatted,
 * to a stream. Note that this class does not close the stream, as
 * process.stdout or process.stderr may be used.
 *
 * @constructor StreamHandler
 * @extends Handler
 * @param {Object} [stream=process.stderr]
 * @param {string} [recordTextEnd=\n]
 */
function StreamHandler(stream, recordTextEnd) {
	stream = stream || null;
	recordTextEnd = typeof recordTextEnd !== 'undefined' ? recordTextEnd : '\n';

	Handler.call(this);

	if (!stream) {
		stream = process.stderr;
	}

	this._stream = stream;
	this._recordTextEnd = recordTextEnd;
}
util.inherits(StreamHandler, Handler);

/**
 * Writes the record to the stream (with a trailing newline, if default setup).
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {boolean} false if the stream wishes for the calling code to wait
 * 	for the 'drain' event to be emitted before continuing to write
 * 	additional data; otherwise true.
 */
StreamHandler.prototype.emit = function(record) {
	try {
		var data = this.format(record);

		if (this._recordTextEnd && typeof data === 'string') {
			data += this._recordTextEnd;
		}

		return this._stream.write(data);
	}
	catch (err) {
		this.handleError(err, record);
	}
};


//------------------------------------------------------------------------------
//   Console handler
//------------------------------------------------------------------------------

/**
 * Console handler.
 *
 * @constructor ConsoleHandler
 * @extends Handler
 * @param {number} [level]
 * @param {boolean} [grouping=true]
 */
function ConsoleHandler(level, grouping) {
	grouping = typeof grouping !== 'undefined'? grouping : true;

	Handler.call(this, level);

	this._grouping = grouping;
	this._openGroup = '';
}
util.inherits(ConsoleHandler, Handler);

/** @inheritdoc */
ConsoleHandler.prototype.emit = function(record) {
	var consoleMsg = this.format(record);
	var consoleArgs = [].concat(consoleMsg);

	if (this._grouping && record.name !== this._openGroup) {
		if (this._openGroup) {
			console.groupEnd();
		}

		this._openGroup = record.name;
		console.group(this._openGroup);
	}

	console.log.apply(console, consoleArgs);
};


//------------------------------------------------------------------------------
//   File handlers
//------------------------------------------------------------------------------

var fs = require('fs');

/** @private */
function getFileSize(path) {
	return new Promise(function(resolve, reject) {
		fs.stat(path, function(err, stats) {
			if (err) {
				if (err.code === 'ENOENT') {
					resolve(null);
				} else {
					reject(err);
				}
				return;
			}

			resolve(stats.size);
		});
	});
}

/** @private */
function renameFile(oldPath, newPath) {
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
 * File handler.
 *
 * @constructor FileHandler
 * @extends StreamHandler
 * @param {string} filename
 * @param {string} [mode=a] {@link https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback}
 * @param {string} [encoding=utf8] {@link https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings}
 * @param {boolean} [delay=false]
 */
function FileHandler(filename, mode, encoding, delay) {
	mode = mode || 'a';
	encoding = typeof encoding !== 'undefined' ? encoding : 'utf8';
	delay = typeof delay !== 'undefined' ? delay : false;

	/**
	 * @private
	 * @type {string}
	 */
	this._filename = filename;

	/**
	 * @private
	 * @type {string}
	 */
	this._mode = mode;

	/**
	 * @private
	 * @type {string}
	 */
	this._encoding = encoding;

	if (delay) {
		StreamHandler.call(this);
		this._stream = null;

	} else {
		StreamHandler.call(this, this._open());
	}
	
}
util.inherits(FileHandler, StreamHandler);

/** @inheritdoc */
FileHandler.prototype.emit = function(record) {
	if (!this._stream) {
		this._stream = this._open();
	}

	return StreamHandler.prototype.emit.call(this, record);
};

/**
 * @private
 * @return {WriteStream}
 */
FileHandler.prototype._open = function() {
	return fs.createWriteStream(
		this._filename,
		{ flags: this._mode, encoding: this._encoding }
	);
};


/**
 * Handler for logging to a set of files, which switches from one file
 * to the next when the current file reaches a certain size.
 *
 * @constructor RotatingFileHandler
 * @param {string} filename
 * @param {string} [mode=a]  {@link https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback}
 * @param {number} [maxBytes=0]
 * @param {number} [backupCount=0]
 * @param {string} [encoding=utf8] {@link https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings}
 * @param {boolean} [delay=false]
 */
function RotatingFileHandler(filename, mode, maxBytes, backupCount,
                             encoding, delay) {
	mode = mode || 'a';
	maxBytes = typeof maxBytes !== 'undefined' ? maxBytes : 0;
	backupCount = typeof backupCount !== 'undefined' ? backupCount : 0;
	encoding = typeof encoding !== 'undefined' ? encoding : 'utf8';
	delay = typeof delay !== 'undefined' ? delay : false;

	if (maxBytes > 0) {
		mode = 'a';
	}

	FileHandler.call(this, filename, mode, encoding, delay);

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
	 * @type {Promise}
	 */
	this._chain = Promise.resolve();
}
util.inherits(RotatingFileHandler, FileHandler);

/**
 * Determine if rollover should occur.
 *
 * @protected
 * @param  {string} formatedRecord Formatted (ready to actually make log)
 * 	record.
 * @return {Promise<boolean>} True if rollover should occur, false otherwise.
 */
RotatingFileHandler.prototype.shouldRollover = function(formatedRecord) {
	if (this._maxBytes === 0) {
		return Promise.resolve(false);
	}

	var maxBytes = this._maxBytes;

	return getFileSize(this._filename)
		.then(function(size) {
			return (size + formatedRecord.length) > maxBytes;
		});
};

/**
 * Do a rollover.
 *
 * @protected
 * @return {Promise}
 */
RotatingFileHandler.prototype.doRollover = function() {
	var that = this;
	var finish = null;
	var renameFileBinded = null;

	if (this._stream) {
		finish = this._close()
			.then(function () {
				that._stream = null;
			});
	} else {
		finish = Promise.resolve();
	}

	for (var i = this._backupCount - 1; i >= 0; i--) {
		renameFileBinded = renameFile.bind(
			this,
			this._filename + (i === 0 ? '' : '.' + i),
			this._filename + '.' + (i + 1)
		);

		finish = finish
			.then(renameFileBinded)
			.catch(function(err) {
				if (err.code === 'ENOENT') {
					return;
				}

				return err;
			});
	}

	return finish;
};

/**
 * Emit a record.
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {Promise}
 */
RotatingFileHandler.prototype.emit = function(record) {
	try {
		var that = this;
		var onRejected = this._handleReject.bind(this, record);
		var formatedRecord = this.format(record);

		if (this._recordTextEnd) {
			formatedRecord += this._recordTextEnd;
		}

		this._chain = this._chain
			.then(function() {
				return that.shouldRollover(formatedRecord);
			}, onRejected)

			.then(function(shouldRollover) {
				return shouldRollover
					? that.doRollover()
					: Promise.resolve();
			}, onRejected)

			.then(function() {
				if (!that._stream) {
					that._stream = that._open();
				}

				return new Promise(function(resolve, reject) {
					that._stream.write(formatedRecord, function(err) {
						if (err) {
							reject(err);
							return;
						}

						resolve(formatedRecord);
					});
				});
			}, onRejected)

			.catch(onRejected);
	
		return this._chain;
	}
	catch (err) {
		this.handleError(err, record);

		return Promise.reject(err);
	}
};

/**
 * Closes the stream.
 * @return {Promise}
 */
RotatingFileHandler.prototype.close = function() {
	var that = this;

	this._chain = this._chain
		.then(function () {
			return that._close();
		})
		.then(function () {
			that._stream = null;
		});

	return this._chain;
};

/**
 * @private
 * @return {Promise}
 */
RotatingFileHandler.prototype._close = function() {
	var that = this;

	return new Promise(function(resolve, reject) {
		that._stream.end(resolve);
	});
};

/**
 * @private
 * @param  {module:py-logging.LogRecord} record
 * @param  {Error} error
 */
RotatingFileHandler.prototype._handleReject = function(record, error) {
	this.handleError(error, record);
};


//------------------------------------------------------------------------------
//   HTTP handlers
//------------------------------------------------------------------------------

var libUrl = require('url');
var http = require('http');

/**
 * A class which sends records to a Web server, using either GET or
 * POST semantics.
 *
 * @constructor HttpHandler
 * @param {string} url
 * @param {string} [method=GET]
 * @param {Object} [headers]
 */
function HttpHandler(url, method, headers) {
	method = typeof method !== 'undefined' ? method : 'GET';
	headers = headers || {};

	Handler.call(this);

	if (method !== 'GET' && method !== 'POST') {
		throw new Error('Argument 4 of HttpHandler.constructor has unsupported'
			+ ' value \'' + method + '\'');
	}

	if (method === 'GET') {
		this._strategy = new HttpGetStrategy(url, headers);

	} else {
		this._strategy = new HttpPostStrategy(url, headers);
	}
}
util.inherits(HttpHandler, Handler);

/**
 * Format the specified record for sending over HTTP.
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {string}
 */
HttpHandler.prototype.format = function(record) {
	if (!this._formatter) {
		return this._serializeData(record);
	}

	return this._formatter.format(record);
};

/** @inheritdoc */
HttpHandler.prototype.emit = function(record) {
	var that = this;
	var data = this.format(record);

	this._strategy.send(data)
		.then(null, function(err) {
			that.handleError(err, record);
		});
};

/**
 * @private
 * @param  {Object} data
 * @return {string}
 */
HttpHandler.prototype._serializeData = function(data) {
	if (typeof(data) === 'string') {
		return data;
	}
	if (!data) {
		return '';
	}

	var arr = [];

	for (var p in data) {
		var value = data[p];
		if (!(value instanceof Array)) {
			value = [value];
		}
		for (var i = 0; i < value.length; i++) {
			var v = value[i];
			var tv = typeof v;

			if (tv !== 'string') {
				try {
					v = JSON.stringify(v);
				}
				catch (error) {
					v = tv;
				}
			}

			arr.push(
				encodeURIComponent(p)+ '=' + encodeURIComponent(v)
			);
		}
	}

	return arr.join('&');
};


/**
 * @private
 * @param {string} url
 * @param {Object} headers
 */
function HttpGetStrategy(url, headers) {
	this._options = Object.assign(
		libUrl.parse(url),
		{
			method: 'GET',
			headers: headers
		}
	);

	if (this._options.path.indexOf('?') > -1) {
		this._options.path += '&';
	} else {
		this._options.path += '?';
	}
}

/**
 * @private
 * @param  {string} data
 * @return {Promise}
 */
HttpGetStrategy.prototype.send = function(data) {
	var options = Object.assign({}, this._options);

	options.path += data;

	return new Promise(function(resolve, reject) {
		var req = http.request(options, resolve);
		req.on('error', reject);
		req.end();
	});
};


/**
 * @private
 * @param {string} url
 * @param {Object} headers
 */
function HttpPostStrategy(url, headers) {
	headers['Content-Type'] = headers['Content-Type']
		|| 'application/x-www-form-urlencoded';

	this._options = Object.assign(
		libUrl.parse(url),
		{
			method: 'POST',
			headers: headers
		}
	);
}

/**
 * @private
 * @param  {string} data
 * @return {Promise}
 */
HttpPostStrategy.prototype.send = function(data) {
	var that = this;

	return new Promise(function(resolve, reject) {
		var req = http.request(that._options, resolve);
		req.on('error', reject);
		req.write(data);
		req.end();
	});
};


module.exports = {
	StreamHandler: StreamHandler,
	ConsoleHandler: ConsoleHandler,
	FileHandler: FileHandler,
	RotatingFileHandler: RotatingFileHandler,
	HttpHandler: HttpHandler
};
