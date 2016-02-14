var util = require('util');
var Handler = require('../lib/logging').Handler;

function MockHandler() {
	Handler.call(this);
}
util.inherits(MockHandler, Handler);

MockHandler.prototype.emit = function(record) {};


function MockFilter(setting) {
	this._setting = !!setting;
}

MockFilter.prototype.filter = function(record) {
	return this._setting;
};


function MockFilterAll() {
	MockFilter.call(this, false);
}
util.inherits(MockFilterAll, MockFilter);


function MockFilterNothing() {
	MockFilter.call(this, true);
}
util.inherits(MockFilterNothing, MockFilter);


module.exports = {
	MockHandler: MockHandler,
	MockFilter: MockFilter,
	MockFilterAll: MockFilterAll,
	MockFilterNothing: MockFilterNothing
};
