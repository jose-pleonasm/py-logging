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

	this._compiledFormat = this._compile(format);
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

/**
 * @private
 * @param  {string} format
 * @return {string}
 */
ConsoleFormatter.prototype._compile = function(format) {
	return format.replace(Formatter.FORMAT_PATTERN, this._getDirective);
};

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
ConsoleFormatter.prototype._getDirective = function(match, key, flag,
                                                    width, precision, type) {
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

	} else if (type === 'O') {
		return '%O';
	}
};


//------------------------------------------------------------------------------
//   Another console formatter
//------------------------------------------------------------------------------

var ua = typeof window === 'object' && window
	&& window.navigator && window.navigator.userAgent;
var isIE = ua && (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1);

/**
 * @memberof module:py-logging-browserkit
 * @constructor StylishConsoleFormatter
 * @extends ConsoleFormatter
 * @param {string} format
 * @param {string} timeFormat
 * @param {Object} styles
 */
function StylishConsoleFormatter(format, timeFormat, styles) {
	format = format || '%(message)';
	timeFormat = timeFormat || '%Y-%m-%d %H:%M:%S';

	this._format = format;
	this._timeFormat = timeFormat;
	this._styles = styles;
	this._store = {};
	this._colors = [
		'#37455c',
		'#1da1f2',
		'#cb2027',
		'#ff5700',
		'#848484',
		'#118C4E',
		'#FF9009',
		'#9A2747',
		'#85A40C',
		'#265273',
		'#BF8E40',
		'#CC6666',
		'#000000',
		'#645188',
	];
	this._counters = {};
}
util.inherits(StylishConsoleFormatter, ConsoleFormatter);

/** @inheritdoc */
StylishConsoleFormatter.prototype.format = function(record) {
	var values = [];
	var cb = this._processItem.bind(this, values, record);
	var s = '';

	s = this._format.replace(
		Formatter.FORMAT_PATTERN,
		cb
	);

	if (record.error) {
		s = s + '%o';
		values.push(record.error);
	}

	return [s].concat(values);
};

/**
 * @private
 * @param  {Array} data
 * @param  {module:py-logging.LogRecord} record
 * @param  {string} match
 * @param  {string} key
 * @param  {string} flag
 * @param  {string} width
 * @param  {string} precision
 * @param  {string} type
 * @return {string}
 */
StylishConsoleFormatter.prototype._processItem = function(data, record,
		match, key, flag, width, precision, type) {
	var directive = this._getDirective(
		match,
		key,
		flag,
		width,
		precision,
		type
	);
	var value = this._getValue(
		record,
		key,
		flag,
		width,
		precision,
		type
	);
	var style = this._styles[key]
			&& (this._styles[key][value] || this._styles[key]['*']);
	var styling = !isIE && style
		? this._getStyling(key, value, style)
		: '';

	if (styling) {
		directive = '%c' + directive;
		data.push(styling);
	}
	data.push(value);
	if (styling) {
		directive = directive + '%c';
		data.push('');
	}

	return directive;
};

/**
 * @private
 * @param  {string} property
 * @param  {*} value
 * @param  {Object} style
 * @return {string}
 */
StylishConsoleFormatter.prototype._getStyling = function(property, value, style) {
	var styleProp = '';
	var styleValue = '';
	var styling = '';
	var completeStyle = Object.assign({}, this._styles.common, style);

	for (styleProp in completeStyle) {
		if (!completeStyle.hasOwnProperty(styleProp)) {
			continue;
		}

		styleValue = completeStyle[styleProp];

		if (styleValue.indexOf('%(color)') > -1) {
			var storeKey = property + value;
			var storeValue = this._store[storeKey];

			if (!storeValue) {
				storeValue = this._getColor(property);
				this._store[storeKey] = storeValue;
			}

			styleValue = styleValue.replace('%(color)', storeValue);
		}

		styling += styleProp + ':' + styleValue;
	}

	return styling;
};

/**
 * @private
 * @param  {string} ns
 * @return {string}
 */
StylishConsoleFormatter.prototype._getColor = function(ns) {
	if (!this._counters[ns]) {
		this._counters[ns] = 0;
	}

	return this._colors[this._counters[ns]++ % this._colors.length];
};


module.exports = {
	ConsoleFormatter: ConsoleFormatter,
	StylishConsoleFormatter: StylishConsoleFormatter,
};
