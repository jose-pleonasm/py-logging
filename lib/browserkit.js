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


//------------------------------------------------------------------------------
//   Another console formatter
//------------------------------------------------------------------------------

var ua = window && window.navigator && window.navigator.userAgent;
var isIE = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1;

/**
 * @memberof module:py-logging-browserkit
 * @constructor StylishConsoleFormatter
 * @extends Formatter
 * @param {string} format
 * @param {string} timeFormat
 * @param {Object} styles
 */
function StylishConsoleFormatter(format, timeFormat, styles) {
	format = format || '%(name)s %(message)s';
	timeFormat = timeFormat || '%H:%M:%S';
	styles = styles || {};

	Formatter.call(this, format, timeFormat);

	this._styles = styles;
	this._store = {};
	this._colors = [
		'#404040',
		'#6DBDD6',
		'#B71427',
		'#9D8501',
		'#585858',
		'#118C4E',
		'#FF9009',
		'#9A2747',
		'#85A40C',
		'#265273',
		'#BF8E40',
		'#CC6666',
		'#133925',
		'#6668CC',
	];
	this._counters = {};
}
util.inherits(StylishConsoleFormatter, Formatter);

/** @inheritdoc */
StylishConsoleFormatter.prototype.format = function(record) {
	var that = this;
	var s = '';
	var stylings = [];

	s = this._format.replace(
		Formatter.FORMAT_PATTERN,
		function (match, property, flag, width, precision, type) {
			var value = record[property];
			var styling = '';
			var style = that._styles[property]
				&& (that._styles[property][value] || that._styles[property]['*']);

			styling = !isIE && style
				? that._getStyling(property, value, style)
				: '';

			stylings.push(styling);

			return '%c' + that._getReplacement(
				record,
				match,
				property,
				flag,
				width,
				precision,
				type
			);
		}
	);

	return [s].concat(stylings);
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

	for (styleProp in style) {
		if (!style.hasOwnProperty(styleProp)) {
			continue;
		}

		styleValue = style[styleProp];

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
