var Logger = require('./Logger');

var instances = {};

var logging = {
	ROOT: 'root',

	getLoggerClass: function() {
		return Logger;
	},

	getLogger: function(name) {
		name = name || '';

		if (!instances[logging.ROOT]) {
			instances[logging.ROOT] = new Logger(logging, logging.ROOT);
			instances[logging.ROOT].setLevel(Logger.WARNING);
		}

		if (!name) {
			return instances[logging.ROOT];
		}

		var parts = name.split('.');
		var currentName = '';
		var prevLogger = instances[logging.ROOT];
		for (var i = 1, len = parts.length; i <= len; i++) {
			currentName = parts.slice(0, i).join('.');
			if (!instances[currentName]) {
				instances[currentName] = new Logger(logging, currentName, prevLogger);
			}
			prevLogger = instances[currentName];
		}

		return instances[name];
	}
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = logging;
}
