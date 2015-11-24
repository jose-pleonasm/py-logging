
/**
 * @constructor Filterer
 */
function Filterer() {
	/**
	 * Array of set filters.
	 * @type {Array}
	 */
	this._filters = [];
}

/**
 * @param {Object} filter
 */
Filterer.prototype.addFilter = function(filter) {
	if (typeof filter !== 'object') {
		throw new Error('[Invalid argument] Argument filter must be an object.');
	}

	this._filters.push(filter);
};

/**
 * @param  {Object} filter
 */
Filterer.prototype.removeFilter = function(filter) {
	var index = this._filters.indexOf(filter);
	if (index > -1) {
		this._filters.splice(index, 1);
	}
};

/**
 * @param  {logging~LogRecord} record
 * @return {boolean} Returns false if specified record is not supposed to be processed. True otherwise.
 */
Filterer.prototype.filter = function(record) {
	for (var i = 0, len = this._filters.length; i < len; i++) {
		if (!this._filters[i].filter(record)) {
			return false;
		}
	}
	return true;
};


module.exports = Filterer;
