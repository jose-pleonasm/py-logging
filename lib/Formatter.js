var strftime = require('./strftime');

/**
 * Default formatter.
 */
function Formatter(format, timeFormat) {
	format = format || '%(message)';
	timeFormat = timeFormat || '%Y-%m-%d %H:%M:%S';

	this._format = format;

	this._timeFormat = timeFormat;
}

Formatter.prototype.formatTime = function(record) {
	return strftime(new Date(record.created), this._timeFormat);
};

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
