var assert = require('assert');
var sinon = require('sinon');
var logging = require('../logging');
var Logger = require('../Logger');

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
		it('#info should be called on root and on child "foo"', function() {
			sandbox.spy(Logger.prototype, 'info');
			var root = logging.getLogger();
			var foo  = logging.getLogger('foo');
			var bar  = logging.getLogger('foo.bar');

			foo.info('message');

			assert(Logger.prototype.info.calledTwice);
			assert(Logger.prototype.info.calledOn(root));
			assert(Logger.prototype.info.calledOn(foo));
			assert(!Logger.prototype.info.calledOn(bar));
		});
	});

});
