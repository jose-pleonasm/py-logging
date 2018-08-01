
/**
 * @constructor Filter
 * @param {string} [name]
 */
function Filter(name) {
	name = name || '';

	/**
	 * @private
	 * @type {string}
	 */
	this._name = name;
}

/**
 * Return the text representation of this filter.
 *
 * @return {string}
 */
Filter.prototype.toString = function() {
	return '[object Filter <' + this._name + '>]';
};

/**
 * Determine if the specified record has to be logged.
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {boolean} Returns false if specified record is not supposed to be processed.
 * 	True otherwise.
 */
Filter.prototype.filter = function(record) {
	if (this._name.length === 0) {
		return true;
	} else if (this._name === record.name) {
		return true;
	} else if (record.name.indexOf(this._name) !== 0) {
		return false;
	} else {
		return record.name[this._name.length] === '.';
	}
};


module.exports = Filter;
