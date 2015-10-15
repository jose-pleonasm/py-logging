var assert = require('assert');
var sinon = require('sinon');
var mocks = require('./mocks');
var logging = require('../lib/logging');
var Logger = logging.getLoggerClass();
var Fmtr = logging.Formatter;
var Hdlr = mocks.MockHandler;

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
			assert.strictEqual(arg.level, Logger.WARNING);
			assert.strictEqual(arg.levelname, Logger.getLevelName(Logger.WARNING));
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
			assert.strictEqual(arg.level, Logger.WARNING);
			assert.strictEqual(arg.levelname, Logger.getLevelName(Logger.WARNING));
			assert.strictEqual(arg.message, 'message');
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
		level: Logger.INFO,
		levelname: Logger.getLevelName(Logger.INFO),
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
			var format = '%(level)';
			var formatter = new Fmtr(format);

			assert.equal(formatter.format(defRecord), Logger.INFO);
		});
		it('should return correct levelname', function() {
			var format = '%(levelname)';
			var formatter = new Fmtr(format);

			assert.equal(
				formatter.format(defRecord),
				Logger.getLevelName(Logger.INFO)
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
	});

});
