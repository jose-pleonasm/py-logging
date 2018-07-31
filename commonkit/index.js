var util = require('util');
var Filter = require('../core/Filter');
var Handler = require('../core/Handler');


/**
 * @module py-logging/commonkit
 */


//------------------------------------------------------------------------------
//   Helper function for extending
//------------------------------------------------------------------------------

/**
 * Extends given object by functions from this module.
 *
 * @function
 * @memberof module:py-logging/commonkit
 * @param  {Object} ns
 * @return {Object}
 */
function install(ns) {
	if (!ns || typeof ns !== 'object') {
		throw new Error('Argument 0 of install is not valid.');
	}

	return Object.assign(ns, module.exports);
}


//------------------------------------------------------------------------------
//   Formatters
//------------------------------------------------------------------------------

/**
 * JSON formatter.
 *
 * @constructor JsonFormatter
 */
function JsonFormatter() {}

/** @inheritdoc */
JsonFormatter.prototype.format = function(record) {
	return JSON.stringify(record);
};

/** @inheritdoc */
JsonFormatter.prototype.toString = function() {
	return '[object JsonFormatter]';
};


//------------------------------------------------------------------------------
//   Filters
//------------------------------------------------------------------------------

/**
 * Whitelist.
 *
 * @constructor WhiteListFilter
 * @extends Filter
 * @param {Array<string>} names Names of Loggers, that are allowed.
 */
function WhiteListFilter(names) {
	Filter.call(this);

	this._names = names;
}
util.inherits(WhiteListFilter, Filter);

/** @inheritdoc */
WhiteListFilter.prototype.filter = function(record) {
	return this._names.indexOf(record.name) > -1;
};


/**
 * Blacklist.
 *
 * @constructor BlackListFilter
 * @extends Filter
 * @param {Array<string>} names Names of Loggers, that are disallowed.
 */
function BlackListFilter(names) {
	Filter.call(this);

	this._names = names;
}
util.inherits(BlackListFilter, Filter);

/** @inheritdoc */
BlackListFilter.prototype.filter = function(record) {
	return this._names.indexOf(record.name) === -1;
};


//------------------------------------------------------------------------------
//   Filters that mutates LogRecord
//------------------------------------------------------------------------------

/**
 * Transformer.
 *
 * @constructor Transformer
 * @extends Filter
 * @param {{rules: Array<{property: string, operation: Function}>}} config
 */
function Transformer(config) {
	Filter.call(this);

	for (var i = config.rules.length - 1; i >= 0; i--) {
		var rule = config.rules[i];

		if (!rule || !rule.property || !rule.operation
			|| typeof rule.property !== 'string'
			|| typeof rule.operation !== 'function') {
			throw new Error(
				'Argument 1 of Transformer.constructor is not valid.'
			);
		}
	}

	this._rules = config.rules;
}
util.inherits(Transformer, Filter);

/** @inheritdoc */
Transformer.prototype.filter = function(record) {
	for (var i = 0, len = this._rules.length; i < len; i++) {
		var rule = this._rules[i];

		record[rule.property] = rule.operation(record[rule.property]);
	}

	return false;
};


//------------------------------------------------------------------------------
//   Accumulator
//------------------------------------------------------------------------------

/**
 * Accumulates equal records and transmits them when is necessary.
 *
 * @constructor AccumulativeHandler
 * @extends Handler
 * @param {Handler} [target]
 */
function AccumulativeHandler(target) {
	target = target || null;

	Handler.call(this);

	this._target = target;
	this._prevRecord = null;
}
util.inherits(AccumulativeHandler, Handler);

/**
 * Set the target handler for this handler.
 *
 * @param {Handler} target
 */
AccumulativeHandler.prototype.setTarget = function(target) {
	this._target = target;
};

/** @inheritdoc */
AccumulativeHandler.prototype.emit = function(record) {
	if (this.equal(record, this._prevRecord)) {
		this._prevRecord.numberofrecords++;

	} else {
		this.flush();
		this._prevRecord = record;
		this._prevRecord.numberofrecords = 1;
	}
};

/**
 * Flushes last record.
 */
AccumulativeHandler.prototype.flush = function() {
	if (!this._prevRecord) {
		return;
	}

	this._target.handle(this._prevRecord);
	this._prevRecord = null;
};

/**
 * Compares two records if are equal.
 *
 * @param  {module:py-logging.LogRecord} recordA
 * @param  {module:py-logging.LogRecord} recordB
 * @return {boolean} True if given records are equal. False otherwise.
 */
AccumulativeHandler.prototype.equal = function(recordA, recordB) {
	return recordA && recordB
		&& recordA.name === recordB.name
		&& recordA.process === recordB.process
		&& recordA.levelno === recordB.levelno
		&& recordA.message === recordB.message
		&& recordA.error == recordB.error;
};


module.exports = {
	install: install,
	JsonFormatter: JsonFormatter,
	WhiteListFilter: WhiteListFilter,
	BlackListFilter: BlackListFilter,
	Transformer: Transformer,
	AccumulativeHandler: AccumulativeHandler,
};
