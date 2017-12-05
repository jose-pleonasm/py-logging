var strftime = require('./strftime');

/**
 * Default formatter.
 *
 * @constructor Formatter
 * @param {string} [format]
 * @param {string} [timeFormat]
 */
function Formatter(format, timeFormat) {
	format = format || '%(message)';
	timeFormat = timeFormat || '%Y-%m-%d %H:%M:%S';

	/**
	 * @private
	 * @type {string}
	 */
	this._format = format;

	/**
	 * @private
	 * @type {string}
	 */
	this._timeFormat = timeFormat;
}

/**
 * Return the text representation of this formatter.
 *
 * @return {string}
 */
Formatter.prototype.toString = function() {
	return '[object Formatter <' + this._format + '>]';
};

/**
 * Return the creation time of the specified LogRecord as formatted text.
 *
 * @param  {module:py-logging.LogRecord} record
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
	var s = '';

	if (stack) {
		s = stack.indexOf(msg) > -1 ? stack : msg + '\n' + stack;
	} else {
		s = msg + (file ? ' in ' + file + ':' + line : '');
	}

	return s;
};

/**
 * Return the specified LogRecord as formatted text.
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {string}
 */
Formatter.prototype.format = function(record) {
	var cb = this._getReplacement.bind(this, record);
	var s = '';

	s = this._format.replace(
		/%\(([a-z]+)\)([-|+])?([0-9]+)?(?:\.([0-9]+))?(s)?/g,
		cb
	);
	if (record.error) {
		record.errorText = this.formatError(record.error);
	}
	if (record.errorText) {
		s = s + '\n' + record.errorText;
	}

	return s;
};

/**
 * @private
 * @param  {module:py-logging.LogRecord} record
 * @param  {string} match
 * @param  {string} key
 * @param  {string} [flag]
 * @param  {number} [width]
 * @param  {number} [precision]
 * @param  {string} [type]
 * @return {string}
 */
Formatter.prototype._getReplacement = function(record, match, key,
                                               flag, width, precision, type) {
	flag = typeof flag !== 'undefined' ? flag : '+';
	width = typeof width !== 'undefined' ? width : NaN;
	precision = typeof precision !== 'undefined' ? precision : NaN;
	type = typeof type !== 'undefined' ? type : '';

	if (key === 'asctime') {
		return this.formatTime(record);
	}
	if (!record[key]) {
		return '';
	}

	var r = '';

	r = record[key];
	if (type) {
		if (type === 's') {
			if (!isNaN(precision) && r.length > precision) {
				r = r.slice(0, precision);
			}
			if (!isNaN(width) && r.length < width) {
				var spaces = getSpaces(width - r.length);
				r = flag === '-' ? r + spaces : spaces + r;
			}
		}
	}

	return r;
};


module.exports = Formatter;


function getSpaces(count) {
	return (new Array(count + 1)).join(' ');
}
