# py-logging
Javascript logging library based on the Python logging module.

More about Python logging here: [https://docs.python.org/2/library/logging.html](https://docs.python.org/2/library/logging.html)

## Examples

### Basic usage

```javascript
var logging = require('py-logging');
var logger = logging.getLogger();
var ConsoleHandler = logging.handlers.ConsoleHandler;

logger.addHandler(new ConsoleHandler());
logger.setLevel(logging.INFO);

logger.info('Just started');
```

### More advanced usage

```javascript
// myApp.js
var logging = require('py-logging');
var handlers = logging.handlers;
var cHandler = new handlers.ConsoleHandler();
var fHandler = new handlers.FileHandler('./myApp.log');

cHandler.setLevel(logging.DEBUG);
fHandler.setLevel(logging.WARNING);
logging.getLogger().setLevel(logging.DEBUG);
logging.getLogger().addHandler(cHandler);
logging.getLogger().addHandler(fHandler);
```
```javascript
// module.js
var logging = require('py-logging');

logging.getLogger('module').info('Module loaded.');

function MyClass() {
	try {
		// staff
	}
	catch (err) {
		logging.getLogger('module.myClass').error('An error occurred.');
	}
}

```
