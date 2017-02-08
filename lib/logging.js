var Logger = require('./Logger');
var Filter = require('./Filter');
var Formatter = require('./Formatter');
var Handler = require('./Handler');
var handlers = require('./handlers');

var MODULE_IDENTIFIER = 'logging';
var manager = null;

/**
 * Manager, which holds the hierarchy of loggers.
 *
 * @private
 */
function Manager() {
	/** @type {Object} */
	this.root = null;

	/** @type {Object} */
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
 * @return {Function}
 */
function getLoggerClass() {
	return Logger;
}

/**
 * Return a logger with the specified name, creating it if necessary.
 * If no name is specified, return the root logger.
 *
 * @param  {string} name
 * @return {Object}
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
 * @param  {Object} options
 */
function basicConfig(options) {
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
 * Configure logging using a JSON.
 *
 * @param  {Object} config
 * @param  {?Object} [outerContext]
 */
Configurator.jsonConfig = function(config, outerContext) {
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
		outerContext
	);
	instancies.formatters = Configurator._createInstancies(
		params.formatters
	);

	// filters
	params.filters = Configurator._getSectionParams(
		config.filters,
		outerContext
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
		var classPath = identifier;
		var instance = null;

		delete settings.level;

		params.loggers[identifier] = {
			classPath: classPath,
			constructor: null,
			args: null,
			settings: settings
		};

		instance = getLogger(classPath);
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
		var isInner = klass.indexOf(MODULE_IDENTIFIER + '.') === 0;
		var classPath = isInner
			? klass.replace(MODULE_IDENTIFIER + '.', '')
			: klass;
		var context = isInner ? module.exports : outerContext;
		var constructor = Configurator._getClass(classPath, context);
		if (!constructor) {
			throw new Error(
				'Class "' + klass + '" does not exist.'
			);
		}
		var argsList = Configurator._getArgsList(constructor);
		var args = Configurator._getMatchingArgs(argsList, descriptor);

		delete settings.class;
		delete settings.level;
		for (var i = 0, len = argsList.length; i < len; i++) {
			delete settings[argsList[i]];
		}

		params[identifier] = {
			classPath: classPath,
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

		instancies[identifier] = Configurator._createInstance(
			itemParams.constructor,
			itemParams.args
		);
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
 * @param  {string} classPath
 * @param  {Object} context
 * @return {?Function}
 */
Configurator._getClass = function(classPath, context) {
	var propertiesChain = classPath.split('.');
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
		.split(/,\s*/);

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
	MODULE_IDENTIFIER: MODULE_IDENTIFIER,

	NOTSET:   Logger.NOTSET,
	DEBUG:    Logger.DEBUG,
	INFO:     Logger.INFO,
	WARNING:  Logger.WARNING,
	ERROR:    Logger.ERROR,
	CRITICAL: Logger.CRITICAL,

	getLevelName: Logger.getLevelName,
	getLoggerClass: getLoggerClass,
	getLogger: getLogger,
	basicConfig: basicConfig,

	jsonConfig: Configurator.jsonConfig,

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