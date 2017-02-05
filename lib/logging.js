var Logger = require('./Logger');
var Filter = require('./Filter');
var Formatter = require('./Formatter');
var Handler = require('./Handler');
var handlers = require('./handlers');

var MODULE_NAME = 'logging';
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

var Configurator = {};

Configurator.FORMAT_VERSION = 1;

Configurator.jsonConfig = function(config) {
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

	var configuration = {};

	configuration.formatters = Configurator._createInstancies(
		Configurator._jsonGetDescriptors(config.formatters)
	);

	console.info(configuration);
};

Configurator._isSupportedVersion = function(version) {
	return version == Configurator.FORMAT_VERSION;
};

Configurator._createInstancies = function(descriptors) {
	var instancies = {};

	for (var identifier in descriptors) {
		if (!descriptors.hasOwnProperty(identifier)) {
			continue;
		}
		var descriptor = descriptors[identifier];
		var instance = null;

		instance = new (descriptor.constructor.bind.apply(
			descriptor.constructor,
			descriptor.args
		));

		instancies[identifier] = instance;
	}

	return instancies;
};

Configurator._jsonGetDescriptors = function(wrapper) {
	if (!wrapper || typeof wrapper !== 'object') {
		return {};
	}
	var descriptors = {};

	for (var identifier in wrapper) {
		if (!wrapper.hasOwnProperty(identifier)) {
			continue;
		}
		if (!wrapper[identifier] || typeof wrapper[identifier] !== 'object'
			|| typeof wrapper[identifier].class !== 'string') {
			continue;
		}

		var data = wrapper[identifier];
		var isInternal = data.class.indexOf(MODULE_NAME + '.') === 0;
		var context = isInternal ? module.exports : global;
		var classPath = isInternal
			? data.class.replace(MODULE_NAME + '.', '') : data.class;
		var constructor = Configurator._getClass(classPath, context);
		var args = Configurator._getArgs(data, isInternal);

		if (!constructor) {
			continue;
		}

		descriptors[identifier] = {
			classPath: classPath,
			constructor: constructor,
			args: args,
		};
	}

	return descriptors;
};

Configurator._getClass = function(classPath, context) {
	var propertiesChain = classPath.split('.');
	var result = Configurator._getNestedProperty(context, propertiesChain);

	return typeof result === 'function' ? result : null;
};

Configurator._getArgs = function(descriptor, isInternal) {
	var args = [];

	for (var key in descriptor) {
		if (!descriptor.hasOwnProperty(key) || key === 'class') {
			continue;
		}

		args.push(descriptor[key]);
	}

	return args;
};

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

var baseExports = {
	MODULE_NAME: MODULE_NAME,

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