# py-logging
Javascript logging library based on the Python logging module.

[![NPM](https://nodei.co/npm/py-logging.png)](https://nodei.co/npm/py-logging/)

Main features:
* Hierarchical organization of loggers.
* Handlers for various ways of log records processing.
* Filters for very precise log records filtering.
* Formatters for custom layout of log records in the final output.

More about Python logging here: [https://docs.python.org/2/library/logging.html][1]

## Installation
```bash
npm install py-logging
```

## Documentation
[https://github.com/jose-pleonasm/py-logging/tree/master/API.md][2]

## Usage
### A simplest way:
```javascript
var logging = require('py-logging');

logging.info('My message to the world.');
// will do nothing, because default level is WARNING

logging.warning('My another message to the world.');
// will print a message to the console:
// WARNING:root:My another message to the world.
```

### Recording log records in a file:
```javascript
var logging = require('py-logging');

logging.basicConfig({ filename: 'example.log', level: 'DEBUG' });

logging.debug('I am going to say something...');
logging.info('Hello!');
// will create a file "example.log" with content like this:
// DEBUG:root:I am going to say something...
// INFO:root:Hello!
```

### Custom layout of log records:
```javascript
var logging = require('py-logging');

logging.basicConfig({
	format: '%(asctime) - %(levelname) - %(message)',
	timeFormat: '%ISO',
	level: 'DEBUG'
});

logging.info('So far so good.');
// 2017-02-12T15:02:02.910Z - INFO - So far so good.
```

### Logging an error:
```javascript
var logging = require('py-logging');

try {
	someDangerousFunction();
}
catch (error) {
	logging.error('An error occurred during the function call:', error);
}
// ERROR:root:An error occurred during the function call:
// ReferenceError: someDangerousFunction is not defined
//     at Object.<anonymous> (/example.js:6:2)
//     at Module._compile (module.js:571:32)
//     at Object.Module._extensions..js (module.js:580:10)
//     at Module.load (module.js:488:32)
//     at tryModuleLoad (module.js:447:12)
//     at Function.Module._load (module.js:439:3)
//     at Module.runMain (module.js:605:10)
//     at run (bootstrap_node.js:418:7)
//     at startup (bootstrap_node.js:139:9)
//     at bootstrap_node.js:533:3
```

### Instantiating your own Logger:
```javascript
var logging = require('py-logging');
var logger = logging.getLogger('name');

logging.basicConfig({ level: 'DEBUG' });

logger.info('Something specific for this logger.');
// INFO:name:Something specific for this logger.
```

### More complex configuration:
```javascript
var logging = require('py-logging');
var simpleFormatter = new logging.Formatter('%(levelname) %(name) %(message)');
var verboseFormatter = new logging.Formatter('%(asctime) %(levelname) %(name) %(message)');
var consoleHandler = new logging.ConsoleHandler();
var fileHandler = new logging.RotatingFileHandler('./example.log');
var foo = logging.getLogger('foo');
var bar = logging.getLogger('foo.bar');

consoleHandler.setFormatter(simpleFormatter);
consoleHandler.setLevel(logging.DEBUG);
foo.addHandler(consoleHandler);
foo.setLevel(logging.DEBUG);
fileHandler.setFormatter(verboseFormatter);
fileHandler.setLevel(logging.INFO);
bar.addHandler(fileHandler);

foo.info('First message.');
// will print a message to the console:
// INFO foo First message.

bar.info('Second message.');
// will print a message to the console:
// INFO foo.bar Second message.
// and into the file:
// 2017-02-12 15:43:52 INFO foo.bar Second message.
```
Or by a configuration object (can be JSON):
```javascript
var logging = require('py-logging');

logging.config({
	'version': 1,
	'formatters': {
		'simple': {
			'format': '%(levelname) %(name) %(message)'
		},
		'verbose': {
			'format': '%(asctime) %(levelname) %(name) %(message)'
		}
	},
	'handlers': {
		'console': {
			'class': 'logging.ConsoleHandler',
			'formatter': 'simple',
			'level': 'DEBUG'
		},
		'file': {
			'class': 'logging.RotatingFileHandler',
			'filename': './example.log',
			'formatter': 'verbose',
			'level': 'INFO'
		}
	},
	'loggers': {
		'foo': {
			'level': 'DEBUG',
			'handlers': ['console']
		},
		'foo.bar': {
			'handlers': ['file']
		}
	}
});

logging.getLogger('foo').info('First message.');
// will print a message to the console:
// INFO foo First message.

logging.getLogger('foo.bar').info('Second message.');
// will print a message to the console:
// INFO foo.bar Second message.
// and into the file:
// 2017-02-12 15:43:52 INFO foo.bar Second message.
```

[1]: http://docs.python.org/2/library/logging.html
[2]: https://github.com/jose-pleonasm/py-logging/tree/master/API.md
