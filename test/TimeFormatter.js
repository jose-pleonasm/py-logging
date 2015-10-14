var assert = require('assert');
var TimeFormatter = require('../lib/TimeFormatter');


describe('TimeFormatter', function() {
	describe('#format()', function() {
		it('should throw an error', function() {
			var date = new Date('2015-10-40T12:00:00+00:00');

			assert.throws(function() { TimeFormatter.format(date, '') }, Error);
		});
		it('should throw an error', function() {
			var date = 1444824000000;

			assert.throws(function() { TimeFormatter.format(date, '') }, Error);
		});
		it('should return a space', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '% '), ' ');
			assert.strictEqual(TimeFormatter.format(date, ' % '), '  ');
		});
		it('should return a literal \'%\' character', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%%'), '%');
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T13:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%H'), '13');
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T13:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%I'), '01');
		});
		it('should return correct minute', function() {
			var date = new Date('2015-10-14T12:08:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%M'), '08');
		});
		it('should return correct second', function() {
			var date = new Date('2015-10-14T12:00:05+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%S'), '05');
		});
		it('should return AM', function() {
			var date = new Date('2015-10-14T11:59:59+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%p'), 'AM');
		});
		it('should return PM', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%p'), 'PM');
		});
		it('should return correct day', function() {
			var date = new Date('2015-10-01T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%d'), '01');
		});
		it('should return correct month', function() {
			var date = new Date('2015-01-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%m'), '01');
		});
		it('should return correct year', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%y'), '15');
		});
		it('should return correct full year', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%Y'), '2015');
		});
		it('should filled correctly', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%'), '%');
		});
		it('should filled correctly', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%o'), 'o');
		});
		it('should filled correctly', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '90%'), '90%');
		});
		it('should filled correctly', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%%%'), '%%');
		});
		it('should filled correctly', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%%Y'), '%Y');
		});
		it('should filled correctly', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%Nothing%'), 'Nothing%');
		});
		it('should filled correctly', function() {
			var date = new Date('2015-10-14T01:35:09+00:00');
			var format = '%Nothing% %y-%m-%d %H:%M.%S';

			assert.strictEqual(TimeFormatter.format(date, format), 'Nothing 15-10-14 01:35.09');
		});
	});
});