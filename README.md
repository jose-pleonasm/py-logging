# py-logging
Javascript logging library based on the Python logging module.

More about Python logging here: [https://docs.python.org/2/library/logging.html](https://docs.python.org/2/library/logging.html)

## Examples

### Basic usage

```javascript
var logging = require('py-logging');
var logger = logging.getLogger();

logging.basicConfig({level: logging.INFO});

logger.info('Just started');
```
And output will be:
```
INFO:root:Just started
```

### More advanced usage

```javascript
// app.js
var logging = require('py-logging');
var foo = require('./foo');
var bar = require('./bar');
var logger = logging.getLogger();
var format = '%(asctime) - %(levelname) - %(name) - %(message)';
var datefmt = '%Y.%m.%d %H:%M.%S';
var formatter = new logging.Formatter(format, datefmt);
var cHandler = new logging.ConsoleHandler();
var fHandler = new logging.FileHandler('./myApp.log');
 
cHandler.setFormatter(formatter);
cHandler.setLevel(logging.DEBUG);
logger.addHandler(cHandler);

fHandler.setFormatter(formatter);
fHandler.setLevel(logging.WARNING);
logger.addHandler(fHandler);

logger.setLevel(logging.DEBUG);

logger.info('Starting app...');

try {
	foo.run();
	bar.run();
}
catch (err) {
	logger.error('Some module failed!', err);
}
```
```javascript
// foo.js
var logging = require('py-logging');
var logger = logging.getLogger('foo');

module.exports = {
	run: function() {
		logger.info('Starting module foo...');
		// ...
	}
};
```
```javascript
// bar.js
var logging = require('py-logging');
var logger = logging.getLogger('bar');

module.exports = {
	run: function() {
		logger.info('Starting module bar...');
		// ...
		throw new Error('Bar error');
	}
};
```
And output (console) will be:
```
2015.10.28 17:19.09 - INFO - root - Starting app...
2015.10.28 17:19.09 - INFO - foo - Starting module foo...
2015.10.28 17:19.09 - INFO - bar - Starting module bar...
2015.10.28 17:19.09 - ERROR - root - Some module failed!
Error: Bar error
    at Object.module.exports.run (/Users/jose-pleonasm/Work/www/working-space/py-logging/examples/advanced/bar.js:10:9)
    at Object.<anonymous> (/Users/jose-pleonasm/Work/www/working-space/py-logging/examples/advanced/index.js:27:6)
    at Module._compile (module.js:434:26)
    at Object.Module._extensions..js (module.js:452:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Function.Module.runMain (module.js:475:10)
    at startup (node.js:117:18)
    at node.js:951:3
```