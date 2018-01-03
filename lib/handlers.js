var util = require('util');
var fs = require('fs');
var Handler = require('./Handler');

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
 * 	for the 'drain' event to be emitted before continuing to write additional data;
 * 	otherwise true.
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


/**
 * File handler.
 *
 * @constructor FileHandler
 * @extends StreamHandler
 * @param {string} filename
 * @param {string} [mode=a] {@link https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback}
 * @param {string} [encoding=utf8] {@link https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings}
 */
function FileHandler(filename, mode, encoding) {
	mode = mode || 'a';
	encoding = typeof encoding !== 'undefined' ? encoding : 'utf8';

	var stream = fs.createWriteStream(
		filename,
		{ flags: mode, encoding: encoding }
	);

	StreamHandler.call(this, stream);
}
util.inherits(FileHandler, StreamHandler);


function RotatingFileHandler(filename, mode, maxBytes, backupCount, encoding) {
	mode = mode || 'a';
	maxBytes = typeof maxBytes !== 'undefined' ? maxBytes : 0;
	backupCount = typeof backupCount !== 'undefined' ? backupCount : 0;
	encoding = typeof encoding !== 'undefined' ? encoding : 'utf8';

	if (maxBytes > 0) {
		mode = 'a';
	}

	//FileHandler.call(this, stream);
}
util.inherits(RotatingFileHandler, FileHandler);

RotatingFileHandler.prototype.shouldRollover = function(record) {

};

RotatingFileHandler.prototype.doRollover = function(record) {

};


module.exports = {
	StreamHandler: StreamHandler,
	FileHandler: FileHandler,
	RotatingFileHandler: RotatingFileHandler
};
