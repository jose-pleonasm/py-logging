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

var methodMap = {
	'DEBUG': 'debug',
	'INFO': 'info',
	'WARNING': 'warn',
	'ERROR': 'error',
	'CRITICAL': 'error',
};

/**
 * Console handler.
 *
 * @constructor ConsoleHandler
 * @extends Handler
 * @param {number} [level]
 * @param {boolean} [grouping=true]
 * @param {boolean} [collapsed=false]
 */
function ConsoleHandler(level, grouping, collapsed) {
	grouping = typeof grouping !== 'undefined' ? grouping : true;
	collapsed = typeof collapsed !== 'undefined' ? collapsed : false;

	Handler.call(this, level);

	this._grouping = grouping;
	this._groupMethod = collapsed ? 'groupCollapsed' : 'group';
	this._openGroup = '';
}
util.inherits(ConsoleHandler, Handler);

/** @inheritdoc */
ConsoleHandler.prototype.emit = function(record) {
	var consoleMethod = methodMap[record.levelname] || 'log';
	var consoleMsg = this.format(record);
	var consoleArgs = [].concat(consoleMsg);

	if (this._grouping && record.name !== this._openGroup) {
		if (this._openGroup) {
			console.groupEnd();
		}

		this._openGroup = record.name;
		console[this._groupMethod](this._openGroup);
	}

	console[consoleMethod].apply(console, consoleArgs);
};


module.exports = {
	StreamHandler: StreamHandler,
	ConsoleHandler: ConsoleHandler,
};
