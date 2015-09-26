# py-logging
Javascript logging library based on the Python logging module.

More about Python logging here: https://docs.python.org/2/library/logging.html

## Examples

### Basic usage

```javascript
var logging = require('py-logging');
var logger = logging.getLogger();
var handlers = logging.handlers;

logger.addHandler(handlers.basic);
logger.setLevel(logging.INFO);

logger.info('Just started');
```

