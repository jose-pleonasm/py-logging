# py-logging
Javascript logging library based on the Python logging module.

More about Python logging here: [https://docs.python.org/2/library/logging.html](https://docs.python.org/2/library/logging.html)

## Examples

### Basic usage

```javascript
var logging = require('py-logging');
var logger = logging.getLogger();
var formatter = new logging.Formatter();
var handler = new logging.ConsoleHandler;

handler.setFormatter(formatter);
logger.addHandler(handler);
logger.setLevel(logging.INFO);

logger.info('Just started');
```

### More advanced usage

```javascript
// init.js
var logging = require('py-logging');
var formatter = new logging.Formatter('%(created) - %(name) - %(levelname) - %(message)', '%Y-%m-%d %H:%M:%S');
var cHandler = new logging.ConsoleHandler();
var fHandler = new logging.FileHandler('./myApp.log');

cHandler.setFormatter(formatter);
fHandler.setFormatter(formatter);
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
