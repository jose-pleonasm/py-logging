/* eslint-disable */
var assert = require('assert');
var sinon = require('sinon');
var mocks = require('./mocks');
var logging = require('../core/logging');
var commonkit = require('../commonkit');



/**
 * commonkit - Transformer
 */
describe('Transformer', function() {

	it('should not filter', function() {
		var config = { rules: [
			{ property: 'name', operation: function(value) { return value + '_'; } }
		] };
		var transformer = new commonkit.Transformer(config);
		var record = {
			name: 'foo',
			message: 'Foo',
		};
		var result = null;

		result = transformer.filter(record)

		assert.strictEqual(result, false);
	});

	it('should replace (only) name', function() {
		var config = { rules: [
			{ property: 'name', operation: function(value) { return value + '_'; } }
		] };
		var transformer = new commonkit.Transformer(config);
		var record = {
			name: 'foo',
			message: 'Foo',
		};

		transformer.filter(record)

		assert.strictEqual(record.name, 'foo_');
	});

});

