var strftime = require('./strftime');

/**
 * Default formatter.
 *
 * @constructor Formatter
 * @param {string=} format
 * @param {string=} timeFormat
 */
function Formatter(format, timeFormat) {
	format = format || '%(message)';
	timeFormat = timeFormat || '%Y-%m-%d %H:%M:%S';

	this._format = format;

	this._timeFormat = timeFormat;
}

/**
 * Return the creation time of the specified LogRecord as formatted text.
 *
 * @param  {logging~LogRecord} record
 * @return {string}
 */
Formatter.prototype.formatTime = function(record) {
	return strftime(new Date(record.created), this._timeFormat);
};

/**
 * Return the specified Error object as formatted text.
 *
 * @param  {Object} error
 * @return {string}
 */
Formatter.prototype.formatError = function(error) {
	var msg = error.toString();
	var stack = typeof error.stack === 'string' ? error.stack : '';
	var file = typeof error.fileName === 'string' ? error.fileName : '';
	var line = typeof error.lineNumber === 'string' ? error.lineNumber : '';
	var complete = '';

	if (stack) {
		complete = stack.indexOf(msg) > -1 ? stack : msg + '\n' + stack;
	} else {
		complete = msg + (file ? ' in ' + file + ':' + line : '');
	}

	return complete;
};

/**
 * Return the specified LogRecord as formatted text.
 *
 * @param  {logging~LogRecord} record
 * @return {string}
 */
Formatter.prototype.format = function(record) {
	var cb = this._getReplacement.bind(this, record);
	var s = this._format.replace(/%\(([a-z]+)\)/g, cb);

	if (record.error) {
		record.errorText = this.formatError(record.error);
	}
	if (record.errorText) {
		s = s + '\n' + record.errorText;
	}

	return s;
};

/**
 * @param  {logging~LogRecord}} record
 * @param  {string} match
 * @param  {string} attr
 * @return {string}
 */
Formatter.prototype._getReplacement = function(record, match, attr) {
	var r = '';

	if (attr === 'asctime') {
		r = this.formatTime(record);
	} else if (record[attr]) {
		r = record[attr];
	}

	return r;
};


module.exports = Formatter;
