var util = require('util');
var Handler = require('../lib/logging').Handler;

function MockHandler() {
	Handler.call(this);
}
util.inherits(MockHandler, Handler);

MockHandler.prototype.handle = function(record) {};

module.exports = {
	MockHandler: MockHandler
};
