var util = require('util');
var Handler = require('../lib/logging').Handler;

function MockHandler() {
	Handler.call(this);
}
util.inherits(MockHandler, Handler);

MockHandler.prototype.emit = function(record) {};

module.exports = {
	MockHandler: MockHandler
};
