var assert = require('assert');
var sinon = require('sinon');
var logging = require('../logging');
var Logger = require('../Logger');
var mocks = require('./mocks');

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
				assert.strictEqual(logging[constant], Logger[constant]);
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
			assert.strictEqual(root.getEffectiveLevel(), Logger.WARNING);
		});
		it('#getEffectiveLevel should return default child level, which is same as root', function() {
			var foo = logging.getLogger('foo');
			assert.strictEqual(foo.getEffectiveLevel(), Logger.WARNING);
		});
		it('#setLevel should change level of root', function() {
			var level = Logger.DEBUG;
			var root = logging.getLogger();

			root.setLevel(level);

			assert.strictEqual(root.getEffectiveLevel(), level);
		});
		it('#setLevel should set level to "NOTSET"', function() {
			var root = logging.getLogger();

			root.setLevel(Logger.NOTSET);

			assert.strictEqual(root.getEffectiveLevel(), Logger.NOTSET);
		});
		it('#setLevel should throw an Error', function() {
			var root = logging.getLogger();

			assert.throws(function() { root.setLevel(11); }, Error);
		});
		it('#setLevel should change level of child', function() {
			var level = Logger.DEBUG;
			var foo = logging.getLogger('foo');

			foo.setLevel(level);

			assert.strictEqual(foo.getEffectiveLevel(), level);
		});
		it('#setLevel on root should change level of child', function() {
			var level = Logger.DEBUG;
			var root = logging.getLogger();
			var foo = logging.getLogger('foo');

			root.setLevel(level);

			assert.strictEqual(foo.getEffectiveLevel(), level);
		});
		it('#setLevel on child should change only level of child', function() {
			var level = Logger.DEBUG;
			var root = logging.getLogger();
			var foo = logging.getLogger('foo');

			foo.setLevel(level);

			assert.strictEqual(foo.getEffectiveLevel(), level);
			assert.strictEqual(root.getEffectiveLevel(), Logger.WARNING);
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
			var Hdlr = mocks.MockHandler;
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var root = logging.getLogger();

			root.addHandler(handler);
			root.warning('message');

			assert(Hdlr.prototype.handle.calledOnce);
			assert(Hdlr.prototype.handle.calledOn(handler));
		});
		it('#removeHandler should remove handler', function() {
			var Hdlr = mocks.MockHandler;
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var root = logging.getLogger();

			root.addHandler(handler);
			root.removeHandler(handler);
			root.warning('message');

			assert.strictEqual(Hdlr.prototype.handle.callCount, 0);
		});
		it('logger should call all of handlers', function() {
			var Hdlr = mocks.MockHandler;
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
			var Hdlr = mocks.MockHandler;
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
			var Hdlr = mocks.MockHandler;
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
			var Hdlr = mocks.MockHandler;
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
	});

	describe('Record maker', function() {
		it('should create object with correct properties', function() {
			var Hdlr = mocks.MockHandler;
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var logger = logging.getLogger();

			logger.addHandler(handler);
			var time = Date.now();
			logger.warning('message');

			assert(Hdlr.prototype.handle.calledWithExactly({
				created: time, //FIXME: insecure
				name: 'root',
				level: Logger.WARNING,
				levelname: Logger.getLevelName(Logger.WARNING),
				message: 'message'
			}));
		});
		it('should create object with correct logger name', function() {
			var Hdlr = mocks.MockHandler;
			sandbox.spy(Hdlr.prototype, 'handle');
			var handler = new Hdlr();
			var root = logging.getLogger();
			var bar  = logging.getLogger('foo.bar');

			root.addHandler(handler);
			var time = Date.now();
			bar.warning('message');

			assert(Hdlr.prototype.handle.calledWithExactly({
				created: time, //FIXME: insecure
				name: 'foo.bar',
				level: Logger.WARNING,
				levelname: Logger.getLevelName(Logger.WARNING),
				message: 'message'
			}));
		});
	});

});
