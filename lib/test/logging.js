var assert = require('assert');
var sinon = require('sinon');
var logging = require('../logging');
var Logger = require('../Logger');

describe('Logging', function() {

	describe('#getLoggerClass()', function() {
		it('should return a function', function() {
			var loggerClass = logging.getLoggerClass();
			assert.equal('function', typeof(loggerClass));
		});
		it('should return Logger constructor', function() {
			var loggerClass = logging.getLoggerClass();
			assert.equal(Logger, loggerClass);
		});
	});

	describe('#getLogger()', function() {
		it('should return instance of Logger', function() {
			var logger = logging.getLogger();
			assert.equal(true, logger instanceof Logger);
		});
		it('should return same instance', function() {
			var l1 = logging.getLogger();
			var l2 = logging.getLogger();
			assert.equal(l1, l2);
		});
		it('should return same instance using names', function() {
			var foo = logging.getLogger('foo');
			var baz = logging.getLogger('foo.bar.baz');
			assert.equal(baz, logging.getLogger('foo.bar.baz'));
		});
	});

	describe('Constants', function() {
		['NOTSET', 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL']
			.forEach(function(constant) {
			it(constant + ' constant should exists', function() {
				assert.equal(Logger[constant], logging[constant]);
			});
		});
	});

});
describe('Logger', function() {

	describe('#getName()', function() {
		it('should return instance with correct name', function() {
			var l = logging.getLogger('foo');
			assert.equal('foo', l.getName());
		});
		it('should return instance with correct name', function() {
			var l = logging.getLogger('n1.n2.n3.n4');
			assert.equal('n1.n2.n3.n4', l.getName());
		});
	});

	describe('#getChild()', function() {
		it('should return instance of Logger', function() {
			var foo = logging.getLogger('foo');
			assert.equal(true, foo.getChild('bar') instanceof Logger);
		});
		it('should throw a Error', function() {
			var foo = logging.getLogger('foo');
			assert.throws(foo.getChild, Error);
		});
		it('should return correct instance', function() {
			var foo = logging.getLogger('foo');
			var bar = logging.getLogger('foo.bar');
			assert.equal(bar, foo.getChild('bar'));
		});
	});

});
describe('Creating hierarchical list of loggers', function() {

	it('should return correct instance', function() {
		var root = logging.getLogger();
		var foo = logging.getLogger('foo');
		assert.equal(foo, root.getChild('foo'));
	});
	it('should return correct instance', function() {
		var baz = logging.getLogger('foo.bar.baz');
		var foo = logging.getLogger('foo');
		assert.equal(baz, foo.getChild('bar.baz'));
	});

});
describe('Log functions', function() {

	['debug', 'info', 'warning', 'error', 'critical'].forEach(function (lvl) {
		it(lvl + ' function should do the work', function() {
			sinon.spy(Logger.prototype, lvl);
			var logger = logging.getLogger();

			logger[lvl]('message');

			assert(logger[lvl].calledOnce);
			assert(logger[lvl].calledWithExactly('message'));
			assert(logger[lvl].calledOn(logger));
		});
	});

});
