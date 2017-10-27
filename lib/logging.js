var Logger = require('./Logger');
var Filter = require('./Filter');
var Formatter = require('./Formatter');
var Handler = require('./Handler');
var handlers = require('./handlers');

/**
 * @module py-logging
 */

var MODULE_IDENTIFIER = 'logging';
var VERSION = '1.2.0';
var manager = null;

/**
 * Manager, which holds the hierarchy of loggers.
 *
 * @private
 */
function Manager() {
	/**
 	 * @private
	 * @type {?Object}
	 */
	this.root = null;

	/**
 	 * @private
	 * @type {Object}
	 */
	this._loggers = {};
}

/**
 * Get a logger with the specified name, creating it 
 * if it doesn't yet exist. This name is a dot-separated hierarchical 
 * name, such as "a", "a.b", "a.b.c" or similar.
 *
 * @param  {string} name
 * @return {Object}
 */
Manager.prototype.getLogger = function(name) {
	var parts = name.split('.');
	var currentName = '';
	var prevLogger = this.root;
	for (var i = 1, len = parts.length; i <= len; i++) {
		currentName = parts.slice(0, i).join('.');
		if (!this._loggers[currentName]) {
			this._loggers[currentName] = new Logger(this, prevLogger, currentName);
		}
		prevLogger = this._loggers[currentName];
	}

	return this._loggers[name];
};

/**
 *  Removes all the loggers.
 */
Manager.prototype.clear = function() {
	var names = Object.keys(this._loggers);
	var name = '';

	for (var i = 0, len = names.length; i < len; i++) {
		name = names[i];
		this._loggers[name] = null;
		delete this._loggers[name];
	}
	this.root = null;
};

manager = new Manager();
manager.root = new Logger(manager, null, 'root', Logger.WARNING);

/**
 * Return the class to be used when instantiating a logger.
 *
 * @memberof module:py-logging
 * @return {Function}
 */
function getLoggerClass() {
	return Logger;
}

/**
 * Return a logger with the specified name, creating it if necessary.
 * If no name is specified, return the root logger.
 *
 * @memberof module:py-logging
 * @param  {string} name
 * @return {Logger}
 */
function getLogger(name) {
	name = name || '';

	if (!name) {
		return manager.root;
	} else {
		return manager.getLogger(name);
	}
}

/**
 * Do basic configuration for the logging system.
 *
 * @memberof module:py-logging
 * @param  {Object} [options]
 */
function basicConfig(options) {
	options = options || {};

	var filename = options.filename;
	var format = options.format || '%(levelname):%(name):%(message)';
	var timeFormat = options.timeFormat || '';
	var handler = null;
	var formatter = null;

	if (filename) {
		var encoding = options.encoding || '';
		handler = new handlers.FileHandler(filename, encoding);
	} else {
		handler = new handlers.ConsoleHandler();
	}

	formatter = new Formatter(format, timeFormat);
	handler.setFormatter(formatter);
	manager.root.addHandler(handler);
	var level = options.level;
	if (level) {
		if (typeof level === 'string') {
			level = Logger.getLevelByName(level);
		}
		manager.root.setLevel(level);
	}
}

/**
 * Configurator
 *
 * @private
 * @type {Object}
 */
var Configurator = {};

Configurator.FORMAT_VERSION = 1;

Configurator.FUNCTION_SIGNATURE_PATTERN = /function[^(]*\(([^)]*)\)/;

/**
 * Configure logging using a "dict" object.
 *
 * @param  {Object} config
 * @param  {?Object} [outerContext]
 */
Configurator.configure = function(config, outerContext) {
	outerContext = outerContext || global;

	if (!config) {
		throw new Error('Argument config must be specified.');
	}
	if (typeof config !== 'object') {
		throw new Error('Argument config must be an object.');
	}
	if (!Configurator._isSupportedVersion(config.version)) {
		throw new Error(
			'Config format version ' + config.version + ' is not supported.'
		);
	}

	var params = {};
	var instancies = {};

	// formatters
	params.formatters = Configurator._getSectionParams(
		config.formatters,
		outerContext,
		MODULE_IDENTIFIER + '.Formatter'
	);
	instancies.formatters = Configurator._createInstancies(
		params.formatters
	);

	// filters
	params.filters = Configurator._getSectionParams(
		config.filters,
		outerContext,
		MODULE_IDENTIFIER + '.Filter'
	);
	instancies.filters = Configurator._createInstancies(
		params.filters
	);

	// handlers
	params.handlers = Configurator._getSectionParams(
		config.handlers,
		outerContext
	);
	instancies.handlers = Configurator._createInstancies(
		params.handlers
	);
	Configurator._setComponents(
		params.handlers,
		instancies.handlers,
		instancies.formatters,
		'formatter',
		'setFormatter'
	);
	Configurator._setComponents(
		params.handlers,
		instancies.handlers,
		instancies.filters,
		'filters',
		'addFilter'
	);

	// loggers
	params.loggers = {};
	instancies.loggers = {};
	for (var identifier in config.loggers) {
		if (!config.loggers.hasOwnProperty(identifier)) {
			continue;
		}
		var descriptor = config.loggers[identifier];
		var settings = Object.assign({}, descriptor);
		var loggerName = identifier;
		var instance = null;

		delete settings.level;

		params.loggers[identifier] = {
			constructor: null,
			args: null,
			settings: settings
		};

		instance = getLogger(loggerName);
		if (descriptor.level) {
			instance.setLevel(
				Logger.getLevelByName(descriptor.level)
			);
		}

		instancies.loggers[identifier] = instance;
	}
	Configurator._setComponents(
		params.loggers,
		instancies.loggers,
		instancies.handlers,
		'handlers',
		'addHandler'
	);
	Configurator._setComponents(
		params.loggers,
		instancies.loggers,
		instancies.filters,
		'filters',
		'addFilter'
	);
};

/**
 * @private
 * @param  {number}  version
 * @return {boolean}
 */
Configurator._isSupportedVersion = function(version) {
	return version == Configurator.FORMAT_VERSION;
};

/**
 * @private
 * @param  {Object<string, Object>} section
 * @param  {Object} outerContext
 * @param  {string} [defaultClass]
 * @return {Object<string, Object>}
 */
Configurator._getSectionParams = function(section, outerContext, defaultClass) {
	defaultClass = defaultClass || '';

	var params = {};

	for (var identifier in section) {
		if (!section.hasOwnProperty(identifier)) {
			continue;
		}
		if (!section[identifier] || typeof section[identifier] !== 'object') {
			throw new Error('Invalid format.');
		}

		var descriptor = section[identifier];
		var klass = descriptor.class || defaultClass;
		var settings = Object.assign({}, descriptor);
		var constructor = (
			typeof klass === 'function'
				? klass
				: (typeof klass === 'string'
					? Configurator._getConstructor(klass, outerContext) : null)
		);
		if (!constructor) {
			throw new Error(
				'Class "' + klass + '" does not exist.'
			);
		}
		var argsList = Configurator._getArgsList(constructor);
		var args = Configurator._getMatchingArgs(argsList, descriptor);

		delete settings.class;
		for (var i = 0, len = argsList.length; i < len; i++) {
			delete settings[argsList[i]];
		}

		params[identifier] = {
			constructor: constructor,
			args: args,
			settings: settings
		};
	}

	return params;
};

/**
 * @private
 * @param  {Object<string, Object>} sectionParams
 * @return {Object<string, Object>}
 */
Configurator._createInstancies = function(sectionParams) {
	var instancies = {};

	for (var identifier in sectionParams) {
		if (!sectionParams.hasOwnProperty(identifier)) {
			continue;
		}
		var itemParams = sectionParams[identifier];
		var instance = Configurator._createInstance(
			itemParams.constructor,
			itemParams.args
		);

		if (itemParams.settings.level
			&& typeof instance.setLevel === 'function') {
			instance.setLevel(
				Logger.getLevelByName(itemParams.settings.level)
			);
		}

		instancies[identifier] = instance;
	}

	return instancies;
};

/**
 * @private
 * @param {Object<string, Object>} sectionParams
 * @param {Object<string, Object>} subjects
 * @param {Object<string, Object>} components
 * @param {string} subjectSettingsKey
 * @param {string} subjectMethodName
 */
Configurator._setComponents = function(sectionParams, subjects, components,
	subjectSettingsKey, subjectMethodName) {
	for (var identifier in sectionParams) {
		if (!sectionParams.hasOwnProperty(identifier)) {
			continue;
		}
		var itemParams = sectionParams[identifier];
		var subject = subjects[identifier];
		var componentIdentifiers = itemParams.settings[subjectSettingsKey];

		if (!componentIdentifiers) {
			continue;
		}
		if (!Array.isArray(componentIdentifiers)) {
			componentIdentifiers = [componentIdentifiers];
		}

		for (var i = 0, len = componentIdentifiers.length; i < len; i++) {
			subject[subjectMethodName](
				components[componentIdentifiers[i]]
			);
		}
	}
};

/**
 * @private
 * @param  {string} absoluteClassPath
 * @param  {Object} outerContext
 * @return {?Function}
 */
Configurator._getConstructor = function(absoluteClassPath, outerContext) {
	var isInner = absoluteClassPath.indexOf(MODULE_IDENTIFIER + '.') === 0;
	var relativeClassPath = isInner
		? absoluteClassPath.replace(MODULE_IDENTIFIER + '.', '')
		: absoluteClassPath;
	var context = isInner ? module.exports : outerContext;

	return Configurator._procureClass(relativeClassPath, context);
};

/**
 * @private
 * @param  {string} relativeClassPath
 * @param  {Object} context
 * @return {?Function}
 */
Configurator._procureClass = function(relativeClassPath, context) {
	var propertiesChain = relativeClassPath.split('.');
	var result = Configurator._getNestedProperty(context, propertiesChain);

	return typeof result === 'function' ? result : null;
};

/**
 * @private
 * @param  {Object} object
 * @param  {Array<string>} propertiesChain
 * @return {*}
 */
Configurator._getNestedProperty = function(object, propertiesChain) {
	if (!object || typeof object !== 'object') {
		return null;
	}

	var propertyName = propertiesChain.shift();
	var complete = !propertiesChain.length;
	var exists = propertyName in object;

	if (complete) {
		return exists ? object[propertyName] : null;
	}

	return exists
		? Configurator._getNestedProperty(object[propertyName], propertiesChain)
		: null;
};

/**
 * @private
 * @param  {Function} func
 * @return {Array<string>}
 */
Configurator._getArgsList = function(func) {
	var args = func.toString().match(Configurator.FUNCTION_SIGNATURE_PATTERN)[1]
		.split(/\s*,\s*/);

	return args;
};

/**
 * @private
 * @param  {Array<string>} list
 * @param  {Object<string, *>} store
 * @return {Array<*>}
 */
Configurator._getMatchingArgs = function(list, store) {
	var args = [];

	for (var i = 0, len = list.length; i < len; i++) {
		var argName = list[i];

		if (argName === 'level') {
			args[i] = Logger.getLevelByName(store[argName]);
		} else if (argName in store) {
			args[i] = store[argName];
		}
	}

	return args;
};

/**
 * @private
 * @param  {Function} constructor
 * @param  {Array<*>} args
 * @return {Object}
 */
Configurator._createInstance = function(constructor, args) {
	var bindArgs = [constructor].concat(args);

	return new (constructor.bind.apply(constructor, bindArgs));
};

var baseExports = {
	/**
	 * @memberof module:py-logging
	 * @constant
	 * @type {string}
	 */
	MODULE_IDENTIFIER: MODULE_IDENTIFIER,

	/**
	 * @memberof module:py-logging
	 * @constant
	 * @type {string}
	 */
	VERSION: VERSION,

	/**
	 * @memberof module:py-logging
	 * @constant
	 * @type {number}
	 */
	NOTSET:   Logger.NOTSET,

	/**
	 * @memberof module:py-logging
	 * @constant
	 * @type {number}
	 */
	DEBUG:    Logger.DEBUG,

	/**
	 * @memberof module:py-logging
	 * @constant
	 * @type {number}
	 */
	INFO:     Logger.INFO,

	/**
	 * @memberof module:py-logging
	 * @constant
	 * @type {number}
	 */
	WARNING:  Logger.WARNING,

	/**
	 * @memberof module:py-logging
	 * @constant
	 * @type {number}
	 */
	ERROR:    Logger.ERROR,

	/**
	 * @memberof module:py-logging
	 * @constant
	 * @type {number}
	 */
	CRITICAL: Logger.CRITICAL,

	getLoggerClass: getLoggerClass,
	getLogger: getLogger,
	basicConfig: basicConfig,

	/**
	 * Configure logging using a "dict" object.
	 *
	 * @function
	 * @memberof module:py-logging
	 * @param  {Object} config
	 * @param  {?Object} [outerContext]
	 */
	config: Configurator.configure,

	/**
	 * Return the textual representation of logging level.
	 *
	 * @function
	 * @memberof module:py-logging
	 * @param  {number} level
	 * @return {string}
	 */
	getLevelName: Logger.getLevelName,

	/**
	 * @function
	 * @memberof module:py-logging
	 * @see {@link Logger#debug}
	 */
	debug: function debug(msg, error, extra) {
		if (!manager.root.hasHandlers()) {
			basicConfig();
		}
		manager.root.debug(msg, error, extra);
	},

	/**
	 * @function
	 * @memberof module:py-logging
	 * @see {@link Logger#info}
	 */
	info: function info(msg, error, extra) {
		if (!manager.root.hasHandlers()) {
			basicConfig();
		}
		manager.root.info(msg, error, extra);
	},

	/**
	 * @function
	 * @memberof module:py-logging
	 * @see {@link Logger#warning}
	 */
	warning: function warning(msg, error, extra) {
		if (!manager.root.hasHandlers()) {
			basicConfig();
		}
		manager.root.warning(msg, error, extra);
	},

	/**
	 * @function
	 * @memberof module:py-logging
	 * @see {@link Logger#error}
	 */
	error: function error(msg, error, extra) {
		if (!manager.root.hasHandlers()) {
			basicConfig();
		}
		manager.root.error(msg, error, extra);
	},

	/**
	 * @function
	 * @memberof module:py-logging
	 * @see {@link Logger#critical}
	 */
	critical: function critical(msg, error, extra) {
		if (!manager.root.hasHandlers()) {
			basicConfig();
		}
		manager.root.critical(msg, error, extra);
	},

	/**
	 * @function
	 * @memberof module:py-logging
	 * @see {@link Logger#log}
	 */
	log: function log(level, msg, error, extra) {
		if (!manager.root.hasHandlers()) {
			basicConfig();
		}
		manager.root.log(level, msg, error, extra);
	},

	Filter: Filter,
	Formatter: Formatter,
	Handler: Handler,

	_test_reset: reset // For tests only.
};


module.exports = Object.assign(baseExports, handlers);


/** @private */
function reset() {
	manager.clear();
	manager.root = new Logger(manager, null, 'root', Logger.WARNING);
}