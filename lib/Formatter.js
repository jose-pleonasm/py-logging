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

Formatter.FORMAT_PATTERN =
// |key          |flag          |width        |precission          |type
/%\(([a-z]+)\)(?:(-\+|-|\+|0| )?([0-9]+)?(?:\.([0-9]+))?(?=s|d|f))?([s|d|f|o])?/g;

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
		Formatter.FORMAT_PATTERN,
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
	flag = typeof flag !== 'undefined' ? flag : '';
	width = typeof width !== 'undefined' ? parseInt(width, 10) : NaN;
	precision = typeof precision !== 'undefined' ? parseInt(precision, 10) : NaN;
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

		} else if (type === 'd') {
			var number = parseInt(r, 10);
			r = String(number);

			if (precision) {
				var zeroPadding = getPadding(precision - r.length, '0');
				r = zeroPadding + r;
			}

			if (number > 0 && flag.indexOf('+') > -1) {
				r = '+' + r;
			} else if (number > 0 && flag.indexOf(' ') > -1) {
				r = ' ' + r;
			}

		} else if (type === 'f') {
			var number = parseFloat(r);
			if (!isNaN(precision)) {
				number = number.toFixed(precision);
			}
			r = String(number);
			if (number > 0 && flag.indexOf('+') > -1) {
				r = '+' + r;
			} else if (number > 0 && flag.indexOf(' ') > -1) {
				r = ' ' + r;
			}
		}

		if (!isNaN(width) && r.length < width) {
			var paddingChar = flag === '0' && type !== 's' ? '0' : ' ';
			var padding = getPadding(width - r.length, paddingChar);

			r = flag.indexOf('-') === 0 ? r + padding : padding + r;
		}
	}

	return r;
};


module.exports = Formatter;


/** @private */
var cache = {};
function getPadding(count, char) {
	char = char || ' ';

	var cacheKey = char + count;
	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	var r = (new Array(count + 1)).join(char);

	cache[cacheKey] = r;
	return r;
}