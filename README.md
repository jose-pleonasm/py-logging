# py-logging
Javascript logging library based on the Python logging module.

More about Python logging here: https://docs.python.org/2/library/logging.html

## Examples

### Basic usage

```javascript
var logging = require('py-logging');
var Logger = logging.getLoggerClass();
var logger = logging.getLogger();
var handlers = logging.handlers;

logger.setLevel(Logger.INFO);
logger.addHandler(handlers.basic);

logger.info('Just started');
```

