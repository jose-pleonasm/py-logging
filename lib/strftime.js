
var TimeFormatter = {};

TimeFormatter._validate = function(time) {
	if (!time || time.getTime() !== time.getTime()) {
		throw new Error('Argument time of strftime is not a valid time.');
	}
};

TimeFormatter._ISO = function(time, format) {
	return format.replace(/%ISO/g, function() {
		return time.toISOString();
	});
};

if (Date.prototype.toLocaleFormat) {
	TimeFormatter.format = function(time, format) {
		if (typeof format === 'undefined') {
			throw new Error('Argument format of strftime is not speciefied.');
		}
		TimeFormatter._validate(time);

		format = TimeFormatter._ISO(time, format);
		return time.toLocaleFormat(format);
	};
} else {
	TimeFormatter.map = {
		'a': '_notImplemented',
		'A': '_notImplemented',
		'b': '_notImplemented',
		'B': '_notImplemented',
		'c': 'toLocaleString',
		'd': 'getDay',
		'H': 'getHour',
		'I': 'get12Hour',
		'j': '_notImplemented',
		'm': 'getMonth',
		'M': 'getMinute',
		'p': 'getAmpm',
		'S': 'getSecond',
		's': 'getTimestamp',
		'U': '_notImplemented',
		'w': '_notImplemented',
		'W': '_notImplemented',
		'x': 'toLocaleDateString',
		'X': 'toLocaleTimeString',
		'y': 'getYear',
		'Y': 'getFullYear',
		'Z': '_notImplemented'
	};

	TimeFormatter._RE = /%(.)/g;

	TimeFormatter.format = function(time, format) {
		if (typeof format === 'undefined') {
			throw new Error('Argument format of strftime is not speciefied.');
		}
		TimeFormatter._validate(time);

		format = TimeFormatter._ISO(time, format);
		var cb = TimeFormatter._getReplacement.bind(TimeFormatter, time);
		var r = format.replace(TimeFormatter._RE, cb);

		return r;
	};

	TimeFormatter.toLocaleString = function(time) {
		return time.toLocaleString();
	};

	TimeFormatter.getDay = function(time) {
		var day = '' + time.getUTCDate();

		day = TimeFormatter._twoDigits(day);

		return day;
	};

	TimeFormatter.getHour = function(time) {
		var hour = '' + time.getUTCHours();

		hour = TimeFormatter._twoDigits(hour);

		return hour;
	};

	TimeFormatter.get12Hour = function(time) {
		var hour = time.getUTCHours();

		if (hour > 12) {
			hour = hour - 12;
		}
		hour = '' + hour;
		hour = TimeFormatter._twoDigits(hour);

		return hour;
	};

	TimeFormatter.getMonth = function(time) {
		var month = time.getUTCMonth();

		month = month + 1;
		month = '' + month;
		month = TimeFormatter._twoDigits(month);

		return month;
	};

	TimeFormatter.getMinute = function(time) {
		var minute = '' + time.getUTCMinutes();

		minute = TimeFormatter._twoDigits(minute);

		return minute;
	};

	TimeFormatter.getAmpm = function(time) {
		var hour = time.getUTCHours();

		return hour >= 12 ? 'PM' : 'AM';
	};

	TimeFormatter.getSecond = function(time) {
		var second = '' + time.getUTCSeconds();

		second = TimeFormatter._twoDigits(second);

		return second;
	};

	TimeFormatter.getTimestamp = function(time) {
		var seconds = Math.floor(time.getTime() / 1000);

		seconds = '' + seconds;

		return seconds;
	};

	TimeFormatter.toLocaleDateString = function(time) {
		return time.toLocaleDateString();
	};

	TimeFormatter.toLocaleTimeString = function(time) {
		return time.toLocaleTimeString();
	};

	TimeFormatter.getYear = function(time) {
		var year = '' + time.getUTCFullYear();

		year = TimeFormatter._twoDigits(year);

		return year;
	};

	TimeFormatter.getFullYear = function(time) {
		var year = '' + time.getUTCFullYear();

		return year;
	};

	TimeFormatter._getReplacement = function(time, match, directive) {
		if (directive === '%') {
			return '%';
		}

		var method = TimeFormatter.map[directive];
		if (method) {
			return TimeFormatter[method](time);
		}
		return directive;
	};

	TimeFormatter._twoDigits = function(s) {
		if (s.length < 2) {
			s = '0' + s;
		} else if (s.length > 2) {
			s = s.slice(-2);
		}

		return s;
	};

	TimeFormatter._notImplemented = function(time) {
		console.warn('This feature is not implemented.');
		return '';
	};
}


module.exports = TimeFormatter.format;
