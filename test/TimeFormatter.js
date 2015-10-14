var assert = require('assert');
var TimeFormatter = require('../lib/TimeFormatter');


describe('TimeFormatter', function() {
	describe('#getDay()', function() {
		it('should throw an error', function() {
			var date = new Date('2015-10-40T12:00:00+00:00');

			assert.throws(function() { TimeFormatter.getDay(date) }, Error);
		});
		it('should throw an error', function() {
			var date = 1444824000000;

			assert.throws(function() { TimeFormatter.getDay(date) }, Error);
		});
		it('should return correct day', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.getDay(date), '14');
		});
		it('should return correct day', function() {
			var date = new Date('2015-10-01T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.getDay(date), '01');
		});
	});
	describe('#getHour()', function() {
		it('should throw an error', function() {
			var date = new Date('2015-10-14T30:00:00+00:00');

			assert.throws(function() { TimeFormatter.getHour(date) }, Error);
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T13:00:00+00:00');

			assert.strictEqual(TimeFormatter.getHour(date), '13');
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T09:00:00+00:00');

			assert.strictEqual(TimeFormatter.getHour(date), '09');
		});
	});
	describe('#get12Hour()', function() {
		it('should throw an error', function() {
			var date = new Date('2015-10-14T30:00:00+00:00');

			assert.throws(function() { TimeFormatter.getHour(date) }, Error);
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T00:00:00+00:00');

			assert.strictEqual(TimeFormatter.get12Hour(date), '00');
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T09:00:00+00:00');

			assert.strictEqual(TimeFormatter.get12Hour(date), '09');
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.get12Hour(date), '12');
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T13:00:00+00:00');

			assert.strictEqual(TimeFormatter.get12Hour(date), '01');
		});
		it('should return correct hour', function() {
			var date = new Date('2015-10-14T23:00:00+00:00');

			assert.strictEqual(TimeFormatter.get12Hour(date), '11');
		});
	});
	describe('#getMonth()', function() {
		it('should throw an error', function() {
			var date = new Date('2015-20-14T12:00:00+00:00');

			assert.throws(function() { TimeFormatter.getMonth(date) }, Error);
		});
		it('should return correct month', function() {
			var date = new Date('2015-01-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.getMonth(date), '01');
		});
		it('should return correct month', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.getMonth(date), '10');
		});
	});
	describe('#getMinute()', function() {
		it('should throw an error', function() {
			var date = new Date('2015-10-14T12:60:00+00:00');

			assert.throws(function() { TimeFormatter.getMinute(date) }, Error);
		});
		it('should return correct minute', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.getMinute(date), '00');
		});
		it('should return correct minute', function() {
			var date = new Date('2015-10-14T12:59:00+00:00');

			assert.strictEqual(TimeFormatter.getMinute(date), '59');
		});
	});
	describe('#getAmpm()', function() {
		it('should throw an error', function() {
			var date = new Date('2015-10-14T30:00:00+00:00');

			assert.throws(function() { TimeFormatter.getAmpm(date) }, Error);
		});
		it('should return AM', function() {
			var date = new Date('2015-10-14T11:59:59+00:00');

			assert.strictEqual(TimeFormatter.getAmpm(date), 'AM');
		});
		it('should return PM', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.getAmpm(date), 'PM');
		});
	});
	describe('#getSecond()', function() {
		it('should throw an error', function() {
			var date = new Date('2015-10-14T12:00:60+00:00');

			assert.throws(function() { TimeFormatter.getSecond(date) }, Error);
		});
		it('should return correct second', function() {
			var date = new Date('2015-10-14T11:00:00+00:00');

			assert.strictEqual(TimeFormatter.getSecond(date), '00');
		});
		it('should return correct second', function() {
			var date = new Date('2015-10-14T12:00:59+00:00');

			assert.strictEqual(TimeFormatter.getSecond(date), '59');
		});
	});
	describe('#getYear()', function() {
		it('should throw an error', function() {
			var date = new Date('999-10-14T12:00:00+00:00');

			assert.throws(function() { TimeFormatter.getYear(date) }, Error);
		});
		it('should return correct year (two digits)', function() {
			var date = new Date('2015-10-14T11:00:00+00:00');

			assert.strictEqual(TimeFormatter.getYear(date), '15');
		});
	});
	describe('#getFullYear()', function() {
		it('should throw an error', function() {
			var date = new Date('999-10-14T12:00:00+00:00');

			assert.throws(function() { TimeFormatter.getFullYear(date) }, Error);
		});
		it('should return correct year (four digits)', function() {
			var date = new Date('2015-10-14T11:00:00+00:00');

			assert.strictEqual(TimeFormatter.getFullYear(date), '2015');
		});
	});
	describe('#format()', function() {
		it('should return a space', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '% '), ' ');
			assert.strictEqual(TimeFormatter.format(date, ' % '), '  ');
		});
		it('should return a literal \'%\' character', function() {
			var date = new Date('2015-10-14T12:00:00+00:00');

			assert.strictEqual(TimeFormatter.format(date, '%%'), '%');
		});
		it('should return full year', function() {
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