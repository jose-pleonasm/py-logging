var util = require('util');
var Formatter = require('./Formatter');
var Handler = require('./Handler');


/**
 * @module py-logging-browserkit
 */


//------------------------------------------------------------------------------
//   Console formatter
//------------------------------------------------------------------------------

/**
 * @private
 * @param  {string} format
 * @return {string}
 */
function compile(format) {
	return format.replace(Formatter.FORMAT_PATTERN, getDirective);
}

/**
 * @private
 * @param  {string} match
 * @param  {string} key
 * @param  {string} [flag]
 * @param  {number} [width]
 * @param  {number} [precision]
 * @param  {string} [type]
 * @return {string}
 */
function getDirective(match, key, flag, width, precision, type) {
	if (type === 's') {
		return '%s';

	} else if (type === 'd') {
		var w = width || '';
		var p = precision || '';
		return '%' + w + (p ? '.' : '') + p + 'd';

	} else if (type === 'f') {
		var w = width || '';
		var p = precision || '';
		return '%' + w + (p ? '.' : '') + p + 'f';

	} else if (type === 'o') {
		return '%o';
	}
}

/**
 * @memberof module:py-logging-browserkit
 * @constructor ConsoleFormatter
 * @extends Formatter
 * @param {string} [format]
 * @param {string} [timeFormat]
 */
function ConsoleFormatter(format, timeFormat) {
	format = format || '%(name)-s %(message)-s';
	timeFormat = timeFormat || '%H:%M:%S';

	Formatter.call(this, format, timeFormat);

	this._compiledFormat = compile(format);
}
util.inherits(ConsoleFormatter, Formatter);

/** @inheritdoc */
ConsoleFormatter.prototype.format = function(record) {
	var re = new RegExp(
		Formatter.FORMAT_PATTERN.source,
		Formatter.FORMAT_PATTERN.flags
	);
	var item = [];
	var s = this._compiledFormat;
	var data = [];

	while ((item = re.exec(this._format)) !== null) {
		var key = item[1];
		var flag = item[2] || '';
		var width = item[3] || NaN;
		var precision = item[4] || NaN;
		var type = item[5] || 's';

		data.push(this._getValue(record, key, flag, width, precision, type));
	}

	if (record.error) {
		s = s + '%o';
		data.push(record.error);
	}

	return [s].concat(data);
};

/**
 * @private
 * @param  {module:py-logging.LogRecord} record
 * @param  {string} key
 * @param  {string} [flag]
 * @param  {number} [width]
 * @param  {number} [precision]
 * @param  {string} [type]
 * @return {string}
 */
ConsoleFormatter.prototype._getValue = function(record, key,
                                                flag, width, precision, type) {
	if (key === 'asctime') {
		return this.formatTime(record);
	}
	if (!record[key]) {
		return '';
	}
	if (type === 's') {
		return this._getReplacement(
			record,
			null,
			key,
			flag,
			width,
			precision,
			type
		);
	}

	return record[key];
};


module.exports = {
	ConsoleFormatter: ConsoleFormatter,
};
