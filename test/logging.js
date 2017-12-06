var assert = require('assert');
var sinon = require('sinon');
var mocks = require('./mocks');
var logging = require('../lib/logging');
var Logger = logging.getLoggerClass();
var Fmtr = logging.Formatter;
var Hdlr = mocks.MockHandler;
var Fltr = mocks.MockFilter;
var FltrAll = mocks.MockFilterAll;
var FltrNothing = mocks.MockFilterNothing;

beforeEach(function () {
	sandbox = sinon.sandbox.create();
});

afterEach(function() {
	logging._test_reset();
	sandbox.restore();
});

/**
 * logging - basics
 */
describe('Logging', function() {

	describe('#getLoggerClass()', function() {
		it('should return a function', function() {
			var loggerClass = logging.getLoggerClass();
			assert.equal(typeof(loggerClass), 'function');
		});
		it('should return Logger constructor', function() {
			assert.strictEqual(logging.getLoggerClass(), Logger);
		});
	});

	describe('#getLogger()', function() {
		it('should return instance of Logger', function() {
			var logger = logging.getLogger();
			assert.strictEqual(logger instanceof Logger, true);
		});
		it('should return same instance', function() {
			var l1 = logging.getLogger();
			var l2 = logging.getLogger();
			assert.strictEqual(l1, l2);
		});
		it('should return same instance using names', function() {
			var foo = logging.getLogger('foo');
			var baz = logging.getLogger('foo.bar.baz');
			assert.strictEqual(logging.getLogger('foo.bar.baz'), baz);
		});
	});

	describe('Constants', function() {
		['NOTSET', 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL']
			.forEach(function(constant) {
			it(constant + ' constant should exist', function() {
				assert.strictEqual(logging[constant], logging[constant]);
			});
		});
	});

});

/**
 * Logger - basics
 */
describe('Logger (basics)', function() {

	describe('#getName()', function() {
		it('should return instance with correct name', function() {
			var l = logging.getLogger('foo');
			assert.equal(l.getName(), 'foo');
		});
		it('should return instance with correct name', function() {
			var l = logging.getLogger('n1.n2.n3.n4');
			assert.equal(l.getName(), 'n1.n2.n3.n4');
		});
	});

	describe('#getChild()', function() {
		it('without argument should throw an Error', function() {
			var foo = logging.getLogger('foo');
			assert.throws(foo.getChild, Error);
		});
		it('should return instance of Logger', function() {
			var foo = logging.getLogger('foo');
			assert.strictEqual(foo.getChild('bar') instanceof Logger, true);
		});
		it('should return correct instance', function() {
			var foo = logging.getLogger('foo');
			var bar = logging.getLogger('foo.bar');
			assert.strictEqual(foo.getChild('bar'), bar);
		});
	});

});

/**
 * Hierarchy
 */
describe('Creating hierarchical list of loggers', function() {

	it('#getChild should return same instance', function() {
		var root = logging.getLogger();
		var foo = logging.getLogger('foo');
		assert.strictEqual(root.getChild('foo'), foo);
	});
	it('#getChild should return different instances', function() {
		assert.strictEqual(
			logging.getLogger().getChild('foo')
				!== logging.getLogger().getChild('bar'),
			true
		);
	});
	it('#getChild should return correct instance', function() {
		var baz = logging.getLogger('foo.bar.baz');
		var foo = logging.getLogger('foo');
		assert.strictEqual(foo.getChild('bar.baz'), baz);
	});

});

/**
 * Logger - main
 */
describe('Logger', function() {

	describe('Level', function() {
		it('#getEffectiveLevel should return default root level, which is "WARNING"', function() {
			var root = logging.getLogger();
			assert.strictEqual(root.getEffectiveLevel(), logging.WARNING);
		});
		it('#getEffectiveLevel should return default child level, which is same as root', function() {
			var foo = logging.getLogger('foo');
			assert.strictEqual(foo.getEffectiveLevel(), logging.WARNING);
		});
		it('#setLevel should change level of root', function() {
			var level = logging.DEBUG;
			var root = logging.getLogger();

			root.setLevel(level);

			assert.strictEqual(root.getEffectiveLevel(), level);
		});
		it('#setLevel should set level to "NOTSET"', function() {
			var root = logging.getLogger();

			root.setLevel(logging.NOTSET);

			assert.strictEqual(root.getEffectiveLevel(), logging.NOTSET);
		});
		it('#setLevel should throw an Error', function() {
			var root = logging.getLogger();

			assert.throws(function() { root.setLevel(11); }, Error);
		});
		it('#setLevel should change level of child', function() {
			var level = logging.DEBUG;
			var foo = logging.getLogger('foo');

			foo.setLevel(level);

			assert.strictEqual(foo.getEffectiveLevel(), level);
		});
		it('#setLevel on root should change level of child', function() {
			var level = logging.DEBUG;
			var root = logging.getLogger();
			var foo = logging.getLogger('foo');

			root.setLevel(level);

			assert.strictEqual(foo.getEffectiveLevel(), level);
		});
		it('#setLevel on child should change only level of child', function() {
			var level = logging.DEBUG;
			var root = logging.getLogger();
			var foo = logging.getLogger('foo');

			foo.setLevel(level);

			assert.strictEqual(foo.getEffectiveLevel(), level);
			assert.strictEqual(root.getEffectiveLevel(), logging.WARNING);
		});
		it('bar#getEffectiveLevel should return level of the parent logger \'foo\'', function() {
			var foo = logging.getLogger('foo');
			var bar = logging.getLogger('foo.bar');

			foo.setLevel(logging.INFO);

			assert.strictEqual(bar.getEffectiveLevel(), logging.INFO);
		});
	});

	describe('#isEnabledFor', function() {
		it('should be enabled for default level', function() {
			var foo = logging.getLogger('foo');

			assert.strictEqual(foo.isEnabledFor(logging.WARNING), true);
		});
		it('should be enabled for set level', function() {
			var root = logging.getLogger();

			root.setLevel(logging.INFO);

			assert.strictEqual(root.isEnabledFor(logging.INFO), true);
		});
		it('should be disabled for level lower than level of the child logger', function() {
			var root = logging.getLogger();
			var foo = logging.getLogger('foo');

			root.setLevel(logging.INFO);
			foo.setLevel(logging.ERROR);

			assert.strictEqual(foo.isEnabledFor(logging.INFO), false);
		});
		it('should be disabled for level lower than default', function() {
			var foo = logging.getLogger('foo');

			assert.strictEqual(foo.isEnabledFor(logging.INFO), false);
		});
	});

	describe('Log functions', function() {
		['debug', 'info', 'warning', 'error', 'critical'].forEach(function(lvl) {
			it('#' + lvl + ' should be called', function() {
				sandbox.spy(Logger.prototype, lvl);
				var logger = logging.getLogger();

				logger[lvl]('message');

				assert(logger[lvl].calledOnce);
				assert(logger[lvl].calledWithExactly('message'));
				assert(logger[lvl].calledOn(logger));
			});
		});
	});

	describe('Manipulating with handlers', function() {
		it('#addHandler should register a new handler'
				+ ' and logger should call handle of this handler', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var root = logging.getLogger();

			root.addHandler(handler);
			root.warning('message');

			assert(Hdlr.prototype.handle.calledOnce);
			assert(Hdlr.prototype.handle.calledOn(handler));
		});
		it('#removeHandler should remove handler', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var root = logging.getLogger();

			root.addHandler(handler);
			root.removeHandler(handler);
			root.warning('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 0);
		});
		it('#hasHandlers should return false if there isnt any registered', function() {
			var root = logging.getLogger();

			assert.strictEqual(root.hasHandlers(), false);
		});
		it('#hasHandlers should return true if there is registered', function() {
			var root = logging.getLogger();
			var handler = new Hdlr();

			root.addHandler(handler);

			assert.strictEqual(root.hasHandlers(), true);
		});
		it('#hasHandlers should return true if parent has any', function() {
			var root = logging.getLogger();
			var foo = logging.getLogger('foo');
			var handler = new Hdlr();

			root.addHandler(handler);

			assert.strictEqual(foo.hasHandlers(), true);
		});
		it('#hasHandlers should return false if parent has any handler'
			+ ' but propagation is disabled', function() {
			var root = logging.getLogger();
			var foo = logging.getLogger('foo');
			var handler = new Hdlr();

			root.addHandler(handler);
			foo.propagate = false;

			assert.strictEqual(foo.hasHandlers(), false);
		});
		it('logger should call all of handlers', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var h1 = new Hdlr();
			var h2 = new Hdlr();
			var root = logging.getLogger();

			root.addHandler(h1);
			root.addHandler(h2);
			root.warning('message');

			assert(Hdlr.prototype.handle.calledTwice);
			assert(Hdlr.prototype.handle.calledOn(h1));
			assert(Hdlr.prototype.handle.calledOn(h2));
		});
		it('handler of parent logger should be called', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var bar = logging.getLogger('foo.bar');

			root.addHandler(handler);
			bar.warning('message');

			assert(Hdlr.prototype.handle.calledOnce);
			assert(Hdlr.prototype.handle.calledOn(handler));
		});
		it('only handler of parent logger should be called', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var fooHandler = new Hdlr();
			var bazHandler = new Hdlr();
			var foo = logging.getLogger('foo');
			var bar = logging.getLogger('foo.bar');
			var baz = logging.getLogger('foo.bar.baz');

			foo.addHandler(fooHandler);
			baz.addHandler(bazHandler);
			bar.warning('message');

			assert(Hdlr.prototype.handle.calledOnce);
			assert(Hdlr.prototype.handle.calledOn(fooHandler));
			assert(!Hdlr.prototype.handle.calledOn(bazHandler));
		});
		it('should be called all the handlers of all loggers', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var rootHandler = new Hdlr();
			var fooHandler1 = new Hdlr();
			var fooHandler2 = new Hdlr();
			var barHandler  = new Hdlr();
			var root = logging.getLogger();
			var foo  = logging.getLogger('foo');
			var bar  = logging.getLogger('foo.bar');

			root.addHandler(rootHandler);
			foo.addHandler(fooHandler1);
			foo.addHandler(fooHandler2);
			bar.addHandler(barHandler);
			bar.warning('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 4);
			assert(Hdlr.prototype.handle.calledOn(rootHandler));
			assert(Hdlr.prototype.handle.calledOn(fooHandler1));
			assert(Hdlr.prototype.handle.calledOn(fooHandler2));
			assert(Hdlr.prototype.handle.calledOn(barHandler));
		});
		it('should not be called any handler', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var rootHandler = new Hdlr();
			var root = logging.getLogger();

			root.addHandler(rootHandler);
			root.info('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 0);
		});
		it('should not be called any handler', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var bar = logging.getLogger('foo.bar');

			bar.addHandler(handler);
			bar.info('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 0);
		});
		it('should be called both handlers', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var rootHandler = new Hdlr();
			var barHandler = new Hdlr();
			var root = logging.getLogger();
			var bar = logging.getLogger('foo.bar');

			root.addHandler(rootHandler);
			bar.addHandler(barHandler);
			root.setLevel(logging.INFO);
			bar.info('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 2);
			assert(Hdlr.prototype.handle.calledOn(rootHandler));
			assert(Hdlr.prototype.handle.calledOn(barHandler));
		});
		it('should be called both handlers', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var rootHandler = new Hdlr();
			var barHandler = new Hdlr();
			var root = logging.getLogger();
			var bar = logging.getLogger('foo.bar');

			root.addHandler(rootHandler);
			bar.addHandler(barHandler);
			bar.setLevel(logging.INFO);
			bar.info('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 2);
			assert(Hdlr.prototype.handle.calledOn(rootHandler));
			assert(Hdlr.prototype.handle.calledOn(barHandler));
		});
	});

	describe('Propagation', function() {
		it('should be propagated to root logger', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var bar = logging.getLogger('foo.bar');

			root.addHandler(handler);
			bar.warning('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 1);
		});
		it('should not be propagated to root logger', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var rootHandler = new Hdlr();
			var barHandler = new Hdlr();
			var root = logging.getLogger();
			var foo = logging.getLogger('foo');
			var bar = logging.getLogger('foo.bar');

			root.addHandler(rootHandler);
			bar.addHandler(barHandler);
			foo.propagate = false;
			bar.warning('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 1);
			assert(Hdlr.prototype.handle.calledOn(barHandler));
		});
	});

	describe('Record maker', function() {
		it('should create object with correct properties', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var logger = logging.getLogger();

			logger.addHandler(handler);
			logger.warning('<strong>Varování</strong>');

			var arg = Hdlr.prototype.handle.args[0][0];
			assert.strictEqual(typeof arg.created, 'number');
			assert.strictEqual(arg.name, 'root');
			assert.strictEqual(arg.levelno, logging.WARNING);
			assert.strictEqual(arg.levelname, logging.getLevelName(logging.WARNING));
			assert.strictEqual(arg.message, '<strong>Varování</strong>');
		});
		it('should create object with correct logger name', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var bar  = logging.getLogger('foo.bar');

			root.addHandler(handler);
			bar.warning('message');

			var arg = Hdlr.prototype.handle.args[0][0];
			assert.strictEqual(typeof arg.created, 'number');
			assert.strictEqual(arg.name, 'foo.bar');
			assert.strictEqual(arg.levelno, logging.WARNING);
			assert.strictEqual(arg.levelname, logging.getLevelName(logging.WARNING));
			assert.strictEqual(arg.message, 'message');
		});
		it('should create object containing error object', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var logger = logging.getLogger();

			logger.addHandler(handler);

			try {
				undef;
			}
			catch (err) {
				logger.error('Chyba', err);
			}

			var arg = Hdlr.prototype.handle.args[0][0];
			assert.strictEqual(typeof arg.created, 'number');
			assert.strictEqual(arg.name, 'root');
			assert.strictEqual(arg.levelno, logging.ERROR);
			assert.strictEqual(arg.levelname, logging.getLevelName(logging.ERROR));
			assert.strictEqual(arg.message, 'Chyba');
			assert.strictEqual(arg.error instanceof Error, true);
		});
		it('should create object containing extra properties', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var logger = logging.getLogger();

			logger.addHandler(handler);
			logger.warning('Varování', null, { foo:'bar', baz:1 });

			var arg = Hdlr.prototype.handle.args[0][0];
			assert.strictEqual(typeof arg.created, 'number');
			assert.strictEqual(arg.name, 'root');
			assert.strictEqual(arg.levelno, logging.WARNING);
			assert.strictEqual(arg.levelname, logging.getLevelName(logging.WARNING));
			assert.strictEqual(arg.message, 'Varování');
			assert.strictEqual(arg.foo, 'bar');
			assert.strictEqual(arg.baz, 1);
		});
	});

});

/**
 * Filters
 */
describe('Filters', function() {
	describe('Logger', function() {
		it('#addFilter should register a new filter'
				+ ' and logger should call filter of this filter', function() {
			sandbox.spy(Fltr.prototype, 'filter');
			var filter = new FltrAll();
			var root = logging.getLogger();

			root.addFilter(filter);
			root.warning('message');

			assert(Fltr.prototype.filter.calledOnce);
			assert(Fltr.prototype.filter.calledOn(filter));
		});
		it('#addFilter should register a new filters'
				+ ' and logger should call filter only of the first filter', function() {
			sandbox.spy(Fltr.prototype, 'filter');
			var filter1 = new FltrAll();
			var filter2 = new FltrAll();
			var root = logging.getLogger();

			root.addFilter(filter1);
			root.addFilter(filter2);
			root.warning('message');

			assert(Fltr.prototype.filter.calledOnce);
			assert(Fltr.prototype.filter.calledOn(filter1));
		});
		it('#addFilter should register a new filters'
				+ ' and logger should call filter of every filter', function() {
			sandbox.spy(Fltr.prototype, 'filter');
			var filter1 = new FltrNothing();
			var filter2 = new FltrNothing();
			var root = logging.getLogger();

			root.addFilter(filter1);
			root.addFilter(filter2);
			root.warning('message');

			assert(Fltr.prototype.filter.calledTwice);
			assert(Fltr.prototype.filter.calledOn(filter1));
			assert(Fltr.prototype.filter.calledOn(filter2));
		});
		it('#addFilter should register a new filter'
				+ ' and logger should filter the log event', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var filter = new FltrAll();
			var root = logging.getLogger();

			root.addFilter(filter);
			root.addHandler(handler);
			root.warning('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 0);
		});
		it('#removeFilter should remove filter', function() {
			sandbox.spy(Fltr.prototype, 'filter');
			var filter = new FltrAll();
			var root = logging.getLogger();

			root.addFilter(filter);
			root.removeFilter(filter);
			root.warning('message');

			assert.strictEqual(Fltr.prototype.filter.callCount, 0);
		});
		it('#addFilter should register a new filters'
				+ ' and then #removeFilter should remove the first one'
				+ ' and logger should call filter of the second filter', function() {
			sandbox.spy(Fltr.prototype, 'filter');
			var filter1 = new FltrNothing();
			var filter2 = new FltrNothing();
			var root = logging.getLogger();

			root.addFilter(filter1);
			root.addFilter(filter2);
			root.removeFilter(filter1);
			root.warning('message');

			assert(Fltr.prototype.filter.calledOnce);
			assert(Fltr.prototype.filter.calledOn(filter2));
		});
	});
	describe('Handler', function() {
		it('#addFilter should register a new filter'
				+ ' and logger should call filter of this filter', function() {
			sandbox.spy(Fltr.prototype, 'filter');
			var filter = new FltrAll();
			var handler = new Hdlr();

			handler.addFilter(filter);
			handler.handle({});

			assert(Fltr.prototype.filter.calledOnce);
			assert(Fltr.prototype.filter.calledOn(filter));
		});
		it('#removeFilter should remove filter', function() {
			sandbox.spy(Fltr.prototype, 'filter');
			var filter = new FltrAll();
			var handler = new Hdlr();

			handler.addFilter(filter);
			handler.removeFilter(filter);
			handler.handle({});

			assert.strictEqual(Fltr.prototype.filter.callCount, 0);
		});
	});
	describe('Filtering with default filter', function() {
		it('nameless filter should not filter anything', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var filter = new logging.Filter();
			var rootHandler = new Hdlr();
			var aHandler = new Hdlr();
			var root = logging.getLogger();
			var a = logging.getLogger('A');

			a.addFilter(filter);
			root.addHandler(rootHandler);
			a.addHandler(aHandler);
			a.warning('message');

			assert(Hdlr.prototype.handle.calledTwice);
			assert(Hdlr.prototype.handle.calledOn(rootHandler));
			assert(Hdlr.prototype.handle.calledOn(aHandler));
		});
		it('filter "A.B" should allow events logged by logger "A.B"', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var filter = new logging.Filter('A.B');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var ab = logging.getLogger('A.B');

			root.addHandler(handler);
			ab.addFilter(filter);
			ab.warning('message');

			assert(Hdlr.prototype.handle.calledOnce);
			assert(Hdlr.prototype.handle.calledOn(handler));
		});
		it('filter "A.B" should allow events logged by logger  "A.B.C"', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var filter = new logging.Filter('A.B');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var abc = logging.getLogger('A.B.C');

			root.addHandler(handler);
			abc.addFilter(filter);
			abc.warning('message');

			assert(Hdlr.prototype.handle.calledOnce);
			assert(Hdlr.prototype.handle.calledOn(handler));
		});
		it('filter "A.B" should allow events logged by logger  "A.B.C.D"', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var filter = new logging.Filter('A.B');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var abcd = logging.getLogger('A.B.C.D');

			root.addHandler(handler);
			abcd.addFilter(filter);
			abcd.warning('message');

			assert(Hdlr.prototype.handle.calledOnce);
			assert(Hdlr.prototype.handle.calledOn(handler));
		});
		it('filter "A.B" should allow events logged by logger  "A.B.D"', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var filter = new logging.Filter('A.B');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var abd = logging.getLogger('A.B.D');

			root.addHandler(handler);
			abd.addFilter(filter);
			abd.warning('message');

			assert(Hdlr.prototype.handle.calledOnce);
			assert(Hdlr.prototype.handle.calledOn(handler));
		});
		it('filter "A.B" should not allow events logged by logger  "A.BB"', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var filter = new logging.Filter('A.B');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var abb = logging.getLogger('A.BB');

			root.addHandler(handler);
			abb.addFilter(filter);
			abb.warning('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 0);
		});
		it('filter "A.B" should not allow events logged by logger  "B.A.B"', function() {
			sandbox.spy(Hdlr.prototype, 'handle');
			var filter = new logging.Filter('A.B');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var bab = logging.getLogger('B.A.B');

			root.addHandler(handler);
			bab.addFilter(filter);
			bab.warning('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 0);
		});
	});
});

/**
 * Formatter
 */
describe('Formatter', function() {
	var defRecord = {
		created: 1444673640264,
		name: 'root',
		levelno: logging.INFO,
		levelname: logging.getLevelName(logging.INFO),
		message: 'Lorem ipsum.'
	};

	describe('#format()', function() {
		it('should return correct time', function() {
			var format = '%(created)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(defRecord), '1444673640264');
		});
		it('should return correct time', function() {
			var format = '%(asctime)';
			var timeFormat = '%ISO';
			var formatter = new Fmtr(format, timeFormat);

			assert.equal(formatter.format(defRecord), '2015-10-12T18:14:00.264Z');
		});
		it('should return correct name', function() {
			var format = '%(name)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(defRecord), 'root');
		});
		it('should return correct level', function() {
			var format = '%(levelno)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(defRecord), logging.INFO);
		});
		it('should return correct levelname', function() {
			var format = '%(levelname)';
			var formatter = new Fmtr(format);

			assert.equal(
				formatter.format(defRecord),
				logging.getLevelName(logging.INFO)
			);
		});
		it('should return correct message', function() {
			var format = '%(message)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(defRecord), 'Lorem ipsum.');
		});
		it('should parse correctly', function() {
			var format = '%(mess%(message)age)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(defRecord), '%(messLorem ipsum.age)');
		});
		it('unknown attribute should be omitted', function() {
			var format = '%(unknown)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(defRecord), '');
		});
		it('should be filled repeatedly', function() {
			var format = '%(name)%(name)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(defRecord), 'rootroot');
		});

		it('should be filled properly', function() {
			var format = '%(asctime) [%(levelname)] (%(name)) %() %(nothing)\t->\t"%(message)"';
			var timeFormat = '%Y-%m-%d %H:%M.%S';
			var formatter = new Fmtr(format, timeFormat);

			assert.equal(
				formatter.format(defRecord),
				'2015-10-12 18:14.00 [INFO] (root) %() \t->\t"Lorem ipsum."'
			);
		});
		it('should return extra property', function() {
			var record = Object.assign(defRecord, { foo:'bar' });
			var format = '%(foo)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(record), 'bar');
		});
		// string
		describe(' - string', function() {
			it('should return correct message'
					+ ' with length as long as really is', function() {
				var message = 'Lorem ipsum';
				var record = { message: message };
				var format = '%(message)' + message.length + 's';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), message);
				assert.strictEqual(formatter.format(record).length, message.length);
			});
			it('should return message with length 20 chars', function() {
				var message = 'Lorem ipsum';
				var record = { message: message };
				var format = '%(message)20s';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record).length, 20);
			});
			it('should return correct message with real length', function() {
				var message = 'Lorem ipsum. Lorem ipsum. Lorem ipsum';
				var record = { message: message };
				var format = '%(message)20s';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), message);
				assert.strictEqual(formatter.format(record).length, message.length);
			});
			it('should return message aligned to right', function() {
				var message = 'Lorem ipsum';
				var record = { message: message };
				var format = '%(message)20s';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), '         ' + message);
			});
			it('should return message aligned to right (explicitly)', function() {
				var message = 'Lorem ipsum';
				var record = { message: message };
				var format = '%(message)+20s';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), '         ' + message);
			});
			it('should return message aligned to left', function() {
				var message = 'Lorem ipsum';
				var record = { message: message };
				var format = '%(message)-20s';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), message + '         ');
			});
			it('should return correct message with maximal 5 chars', function() {
				var message1 = 'Lor';
				var message2 = 'Lorem ipsum. Lorem ipsum. Lorem ipsum';
				var record1 = { message: message1 };
				var record2 = { message: message2 };
				var format = '%(message).5s';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record1).length, 3);
				assert.strictEqual(formatter.format(record2).length, 5);
				assert.strictEqual(formatter.format(record2), message2.slice(0, 5));
			});
			it('should return correct message with exactly 20 chars'
					+ 'but cut to maximal 5 and aligned to right', function() {
				var message1 = 'Lor';
				var message2 = 'Lorem ipsum. Lorem ipsum. Lorem ipsum';
				var record1 = { message: message1 };
				var record2 = { message: message2 };
				var format = '%(message)20.5s';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record1).length, 20);
				assert.strictEqual(formatter.format(record2).length, 20);
				assert.strictEqual(
					formatter.format(record2),
					'               ' + message2.slice(0, 5)
				);
			});
		});
		// integer
		describe(' - integer', function() {
			it('should return correct decimal number', function() {
				var message = 'Lorem ipsum';
				var number1 = 3.14;
				var number2 = -123123123;
				var record1 = { message: message, data: number1 };
				var record2 = { message: message, data: number2 };
				var format = '%(data)d';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record1), String(3));
				assert.strictEqual(formatter.format(record2), String(number2));
			});
			it('should return message with length 4 chars', function() {
				var message = 'Lorem ipsum';
				var number1 = 3.14;
				var number2 = 16;
				var number3 = 9999;
				var number4 = -9;
				var record1 = { message: message, data: number1 };
				var record2 = { message: message, data: number2 };
				var record3 = { message: message, data: number3 };
				var record4 = { message: message, data: number4 };
				var format = '%(data)4d';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record1).length, 4);
				assert.strictEqual(formatter.format(record2).length, 4);
				assert.strictEqual(formatter.format(record3).length, 4);
				assert.strictEqual(formatter.format(record4).length, 4);
			});
			it('should return correct message with real length', function() {
				var message = 'Lorem ipsum';
				var number = -123123123;
				var record = { message: message, data: number };
				var format = '%(data)4d';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), String(number));
				assert.strictEqual(formatter.format(record).length, String(number).length);
			});
			it('should return decimal number with a sign character', function() {
				var message = 'Lorem ipsum';
				var number = 3.14;
				var record = { message: message, data: number };
				var format = '%(data)+2d';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), '+3');
			});
			it('should return message aligned to left', function() {
				var message = 'Lorem ipsum';
				var number = 16;
				var record = { message: message, data: number };
				var format = '%(data)-4d';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), number + '  ');
			});
			it('should return message aligned to left with a sign character', function() {
				var message = 'Lorem ipsum';
				var number = 16;
				var record = { message: message, data: number };
				var format = '%(data)-+4d';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), '+' + number + ' ');
			});
			it('should return zero padded number', function() {
				var message = 'Lorem ipsum';
				var number = 16;
				var record = { message: message, data: number };
				var format = '%(data)010d';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), '00000000' + number);
			});
		});
		// float
		describe(' - float', function() {
			it('should return correct number', function() {
				var message = 'Lorem ipsum';
				var number1 = 3.14;
				var number2 = -123123123;
				var record1 = { message: message, data: number1 };
				var record2 = { message: message, data: number2 };
				var format = '%(data)f';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record1), String(number1));
				assert.strictEqual(formatter.format(record2), String(number2));
			});
			it('should return message with length 4 chars', function() {
				var message = 'Lorem ipsum';
				var number1 = 3.14;
				var number2 = 16;
				var number3 = 9999;
				var number4 = -9;
				var record1 = { message: message, data: number1 };
				var record2 = { message: message, data: number2 };
				var record3 = { message: message, data: number3 };
				var record4 = { message: message, data: number4 };
				var format = '%(data)4f';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record1).length, 4);
				assert.strictEqual(formatter.format(record2).length, 4);
				assert.strictEqual(formatter.format(record3).length, 4);
				assert.strictEqual(formatter.format(record4).length, 4);
			});
			it('should return correct message with real length', function() {
				var message = 'Lorem ipsum';
				var number = -123123123;
				var record = { message: message, data: number };
				var format = '%(data)4f';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), String(number));
				assert.strictEqual(formatter.format(record).length, String(number).length);
			});
			it('should return number with a sign character', function() {
				var message = 'Lorem ipsum';
				var number = 3.14;
				var record = { message: message, data: number };
				var format = '%(data)+2f';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), '+' + number);
			});
			it('should return message aligned to left', function() {
				var message = 'Lorem ipsum';
				var number = 16;
				var record = { message: message, data: number };
				var format = '%(data)-4f';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), number + '  ');
			});
			it('should return message aligned to left with a sign character', function() {
				var message = 'Lorem ipsum';
				var number = 16;
				var record = { message: message, data: number };
				var format = '%(data)-+4f';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), '+' + number + ' ');
			});
			it('should return zero padded number', function() {
				var message = 'Lorem ipsum';
				var number = 16;
				var record = { message: message, data: number };
				var format = '%(data)010f';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record), '00000000' + number);
			});
			it('should return float number with correct precision', function() {
				var message = 'Lorem ipsum';
				var number1 = 3.14;
				var number2 = -123123123;
				var number3 = 1.1999999999999999999;
				var record1 = { message: message, data: number1 };
				var record2 = { message: message, data: number2 };
				var record3 = { message: message, data: number3 };
				var format = '%(data)3.1f';
				var formatter = new Fmtr(format);

				assert.strictEqual(formatter.format(record1), '3.1');
				assert.strictEqual(formatter.format(record2), '-123123123.0');
				assert.strictEqual(formatter.format(record3), '1.2');
			});
		});
	});

});
