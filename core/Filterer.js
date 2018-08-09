
/**
 * A base class for loggers and handlers which allows them to share common code.
 *
 * @constructor Filterer
 */
function Filterer() {
	/**
	 * Array of set filters.
	 *
	 * @private
	 * @type {Array<(Filter|Function)>}
	 */
	this._filters = [];
}

/**
 * @param {(Filter|Function)} filter
 */
Filterer.prototype.addFilter = function(filter) {
	if (typeof filter !== 'object' && typeof filter !== 'function') {
		throw new Error('Argument filter is not an object nor a function.');
	}

	this._filters.push(filter);
};

/**
 * @param  {(Filter|Function)} filter
 */
Filterer.prototype.removeFilter = function(filter) {
	var index = this._filters.indexOf(filter);
	if (index > -1) {
		this._filters.splice(index, 1);
	}
};

/**
 * @param  {module:py-logging.LogRecord} record
 * @return {boolean} Returns false if specified record is not supposed
 * 	to be processed. True otherwise.
 */
Filterer.prototype.filter = function(record) {
	for (var i = 0, len = this._filters.length; i < len; i++) {
		var f = this._filters[i];
		var result = f.filter ? f.filter.call(f, record) : f(record);

		if (!result) {
			return false;
		}
	}
	return true;
};


module.exports = Filterer;
