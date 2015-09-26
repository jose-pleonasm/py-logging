var Logger = require('./Logger');

function basicHandler(record) {
	console.log(
		'[' + Logger.getLevelName(record.level) + ']'
		+ ' ' + record.msg
	);
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		basic: basicHandler
	};
}
