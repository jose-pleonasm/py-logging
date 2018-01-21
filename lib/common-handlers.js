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


module.exports = {
	StreamHandler: StreamHandler,
	ConsoleHandler: ConsoleHandler,
};
