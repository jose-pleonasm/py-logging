## Modules

<dl>
<dt><a href="#module_py-logging">py-logging</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Filterer">Filterer</a></dt>
<dd></dd>
<dt><a href="#Logger">Logger</a> ⇐ <code><a href="#Filterer">Filterer</a></code></dt>
<dd></dd>
<dt><a href="#Handler">Handler</a> ⇐ <code><a href="#Filterer">Filterer</a></code></dt>
<dd></dd>
<dt><a href="#Formatter">Formatter</a></dt>
<dd></dd>
<dt><a href="#Filter">Filter</a></dt>
<dd></dd>
<dt><a href="#ConsoleHandler">ConsoleHandler</a> ⇐ <code><a href="#Handler">Handler</a></code></dt>
<dd></dd>
<dt><a href="#FileHandler">FileHandler</a> ⇐ <code><a href="#Handler">Handler</a></code></dt>
<dd></dd>
<dt><a href="#RotatingFileHandler">RotatingFileHandler</a> ⇐ <code><a href="#Handler">Handler</a></code></dt>
<dd></dd>
<dt><a href="#SyncRotatingFileHandler">SyncRotatingFileHandler</a> ⇐ <code><a href="#Handler">Handler</a></code></dt>
<dd></dd>
<dt><a href="#BrowserBasicHttpHandler">BrowserBasicHttpHandler</a> ⇐ <code><a href="#Handler">Handler</a></code></dt>
<dd></dd>
</dl>

<a name="module_py-logging"></a>

## py-logging

* [py-logging](#module_py-logging)
    * [.MODULE_IDENTIFIER](#module_py-logging.MODULE_IDENTIFIER) : <code>string</code>
    * [.VERSION](#module_py-logging.VERSION) : <code>string</code>
    * [.NOTSET](#module_py-logging.NOTSET) : <code>number</code>
    * [.DEBUG](#module_py-logging.DEBUG) : <code>number</code>
    * [.INFO](#module_py-logging.INFO) : <code>number</code>
    * [.WARNING](#module_py-logging.WARNING) : <code>number</code>
    * [.ERROR](#module_py-logging.ERROR) : <code>number</code>
    * [.CRITICAL](#module_py-logging.CRITICAL) : <code>number</code>
    * [.getLoggerClass()](#module_py-logging.getLoggerClass) ⇒ <code>function</code>
    * [.getLogger(name)](#module_py-logging.getLogger) ⇒ <code>[Logger](#Logger)</code>
    * [.basicConfig(options)](#module_py-logging.basicConfig)
    * [.getLevelName(level)](#module_py-logging.getLevelName) ⇒ <code>string</code>
    * [.config(config, [outerContext])](#module_py-logging.config)
    * [.LogRecord](#module_py-logging.LogRecord) : <code>Object</code>

<a name="module_py-logging.MODULE_IDENTIFIER"></a>

### py-logging.MODULE_IDENTIFIER : <code>string</code>
**Kind**: static constant of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.VERSION"></a>

### py-logging.VERSION : <code>string</code>
**Kind**: static constant of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.NOTSET"></a>

### py-logging.NOTSET : <code>number</code>
**Kind**: static constant of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.DEBUG"></a>

### py-logging.DEBUG : <code>number</code>
**Kind**: static constant of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.INFO"></a>

### py-logging.INFO : <code>number</code>
**Kind**: static constant of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.WARNING"></a>

### py-logging.WARNING : <code>number</code>
**Kind**: static constant of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.ERROR"></a>

### py-logging.ERROR : <code>number</code>
**Kind**: static constant of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.CRITICAL"></a>

### py-logging.CRITICAL : <code>number</code>
**Kind**: static constant of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.getLoggerClass"></a>

### py-logging.getLoggerClass() ⇒ <code>function</code>
Return the class to be used when instantiating a logger.

**Kind**: static method of <code>[py-logging](#module_py-logging)</code>  
<a name="module_py-logging.getLogger"></a>

### py-logging.getLogger(name) ⇒ <code>[Logger](#Logger)</code>
Return a logger with the specified name, creating it if necessary.
If no name is specified, return the root logger.

**Kind**: static method of <code>[py-logging](#module_py-logging)</code>  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="module_py-logging.basicConfig"></a>

### py-logging.basicConfig(options)
Do basic configuration for the logging system.

**Kind**: static method of <code>[py-logging](#module_py-logging)</code>  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="module_py-logging.getLevelName"></a>

### py-logging.getLevelName(level) ⇒ <code>string</code>
Return the textual representation of logging level.

**Kind**: static method of <code>[py-logging](#module_py-logging)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="module_py-logging.config"></a>

### py-logging.config(config, [outerContext])
Configure logging using a "dict" object.

**Kind**: static method of <code>[py-logging](#module_py-logging)</code>  

| Param | Type |
| --- | --- |
| config | <code>Object</code> | 
| [outerContext] | <code>Object</code> | 

<a name="module_py-logging.LogRecord"></a>

### py-logging.LogRecord : <code>Object</code>
**Kind**: static typedef of <code>[py-logging](#module_py-logging)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| created | <code>number</code> | Time when this record was created. |
| name | <code>string</code> | Name of the logger. |
| levelno | <code>number</code> | Numeric logging level. |
| levelname | <code>string</code> | Text logging level. |
| message | <code>string</code> | The logged message. |
| error | <code>Object</code> | The logged error. |
| extra | <code>Object</code> | Extra data. |

<a name="Filterer"></a>

## Filterer
**Kind**: global class  

* [Filterer](#Filterer)
    * [new Filterer()](#new_Filterer_new)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_Filterer_new"></a>

### new Filterer()
A base class for loggers and handlers which allows them to share common code.

<a name="Filterer+addFilter"></a>

### filterer.addFilter(filter)
**Kind**: instance method of <code>[Filterer](#Filterer)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+removeFilter"></a>

### filterer.removeFilter(filter)
**Kind**: instance method of <code>[Filterer](#Filterer)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+filter"></a>

### filterer.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Filterer](#Filterer)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Logger"></a>

## Logger ⇐ <code>[Filterer](#Filterer)</code>
**Kind**: global class  
**Extends:** <code>[Filterer](#Filterer)</code>  

* [Logger](#Logger) ⇐ <code>[Filterer](#Filterer)</code>
    * [new Logger(manager, parent, name, [level])](#new_Logger_new)
    * _instance_
        * [.toString()](#Logger+toString) ⇒ <code>string</code>
        * [.getName()](#Logger+getName) ⇒ <code>string</code>
        * [.getChild(suffix)](#Logger+getChild) ⇒ <code>Object</code>
        * [.getEffectiveLevel()](#Logger+getEffectiveLevel) ⇒ <code>number</code>
        * [.isEnabledFor(level)](#Logger+isEnabledFor) ⇒ <code>boolean</code>
        * [.setLevel(level)](#Logger+setLevel)
        * [.addHandler(handler)](#Logger+addHandler)
        * [.removeHandler(handler)](#Logger+removeHandler)
        * [.debug(msg, [error], [extra])](#Logger+debug)
        * [.info(msg, [error], [extra])](#Logger+info)
        * [.warning(msg, [error], [extra])](#Logger+warning)
        * [.error(msg, [error], [extra])](#Logger+error)
        * [.critical(msg, [error], [extra])](#Logger+critical)
        * [.makeRecord(level, msg, [error], [extra])](#Logger+makeRecord) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
        * [.addFilter(filter)](#Filterer+addFilter)
        * [.removeFilter(filter)](#Filterer+removeFilter)
        * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>
    * _static_
        * [.getLevelName(level)](#Logger.getLevelName) ⇒ <code>string</code>
        * [.getLevelByName(levelName)](#Logger.getLevelByName) ⇒ <code>number</code>

<a name="new_Logger_new"></a>

### new Logger(manager, parent, name, [level])

| Param | Type |
| --- | --- |
| manager | <code>Object</code> | 
| parent | <code>Object</code> | 
| name | <code>string</code> | 
| [level] | <code>number</code> | 

<a name="Logger+toString"></a>

### logger.toString() ⇒ <code>string</code>
Return the text representation of this logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  
<a name="Logger+getName"></a>

### logger.getName() ⇒ <code>string</code>
Return the name of this logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  
<a name="Logger+getChild"></a>

### logger.getChild(suffix) ⇒ <code>Object</code>
Return a logger which is a descendant to this one.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| suffix | <code>string</code> | 

<a name="Logger+getEffectiveLevel"></a>

### logger.getEffectiveLevel() ⇒ <code>number</code>
Return the effective level for this logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  
<a name="Logger+isEnabledFor"></a>

### logger.isEnabledFor(level) ⇒ <code>boolean</code>
Is this logger enabled for specified level?

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Logger+setLevel"></a>

### logger.setLevel(level)
Set the logging level of this logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Logger+addHandler"></a>

### logger.addHandler(handler)
Add the specified handler to this logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| handler | <code>[Handler](#Handler)</code> | 

<a name="Logger+removeHandler"></a>

### logger.removeHandler(handler)
Remove the specified handler from this logger.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| handler | <code>[Handler](#Handler)</code> | 

<a name="Logger+debug"></a>

### logger.debug(msg, [error], [extra])
Log msg with severity 'DEBUG'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+info"></a>

### logger.info(msg, [error], [extra])
Log msg with severity 'INFO'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+warning"></a>

### logger.warning(msg, [error], [extra])
Log msg with severity 'WARNING'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+error"></a>

### logger.error(msg, [error], [extra])
Log msg with severity 'ERROR'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+critical"></a>

### logger.critical(msg, [error], [extra])
Log msg with severity 'CRITICAL'.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+makeRecord"></a>

### logger.makeRecord(level, msg, [error], [extra]) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
Create a LogRecord object.

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Filterer+addFilter"></a>

### logger.addFilter(filter)
**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+removeFilter"></a>

### logger.removeFilter(filter)
**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+filter"></a>

### logger.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Logger.getLevelName"></a>

### Logger.getLevelName(level) ⇒ <code>string</code>
Return the textual representation of logging level.

**Kind**: static method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Logger.getLevelByName"></a>

### Logger.getLevelByName(levelName) ⇒ <code>number</code>
Return value of the level name.

**Kind**: static method of <code>[Logger](#Logger)</code>  

| Param | Type |
| --- | --- |
| levelName | <code>string</code> | 

<a name="Handler"></a>

## Handler ⇐ <code>[Filterer](#Filterer)</code>
**Kind**: global class  
**Extends:** <code>[Filterer](#Filterer)</code>  

* [Handler](#Handler) ⇐ <code>[Filterer](#Filterer)</code>
    * [new Handler([level])](#new_Handler_new)
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * *[.emit(record)](#Handler+emit)*
    * [.handleError(error, [record])](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_Handler_new"></a>

### new Handler([level])
An abstract handler.


| Param | Type |
| --- | --- |
| [level] | <code>number</code> | 

<a name="Handler+setLevel"></a>

### handler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### handler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### handler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| formatter | <code>[Formatter](#Formatter)</code> | 

<a name="Handler+format"></a>

### handler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handle"></a>

### handler.handle(record) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
Handle the specified logging record.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+acquire"></a>

### *handler.acquire()*
**Kind**: instance abstract method of <code>[Handler](#Handler)</code>  
<a name="Handler+release"></a>

### *handler.release()*
**Kind**: instance abstract method of <code>[Handler](#Handler)</code>  
<a name="Handler+emit"></a>

### *handler.emit(record)*
Do whatever it takes to actually log the specified logging record.

**Kind**: instance abstract method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handleError"></a>

### handler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Filterer+addFilter"></a>

### handler.addFilter(filter)
**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+removeFilter"></a>

### handler.removeFilter(filter)
**Kind**: instance method of <code>[Handler](#Handler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+filter"></a>

### handler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Handler](#Handler)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Formatter"></a>

## Formatter
**Kind**: global class  

* [Formatter](#Formatter)
    * [new Formatter([format], [timeFormat])](#new_Formatter_new)
    * [.formatTime(record)](#Formatter+formatTime) ⇒ <code>string</code>
    * [.formatError(error)](#Formatter+formatError) ⇒ <code>string</code>
    * [.format(record)](#Formatter+format) ⇒ <code>string</code>

<a name="new_Formatter_new"></a>

### new Formatter([format], [timeFormat])
Default formatter.


| Param | Type |
| --- | --- |
| [format] | <code>string</code> | 
| [timeFormat] | <code>string</code> | 

<a name="Formatter+formatTime"></a>

### formatter.formatTime(record) ⇒ <code>string</code>
Return the creation time of the specified LogRecord as formatted text.

**Kind**: instance method of <code>[Formatter](#Formatter)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Formatter+formatError"></a>

### formatter.formatError(error) ⇒ <code>string</code>
Return the specified Error object as formatted text.

**Kind**: instance method of <code>[Formatter](#Formatter)</code>  

| Param | Type |
| --- | --- |
| error | <code>Object</code> | 

<a name="Formatter+format"></a>

### formatter.format(record) ⇒ <code>string</code>
Return the specified LogRecord as formatted text.

**Kind**: instance method of <code>[Formatter](#Formatter)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Filter"></a>

## Filter
**Kind**: global class  

* [Filter](#Filter)
    * [new Filter([name])](#new_Filter_new)
    * [.filter(record)](#Filter+filter) ⇒ <code>boolean</code>

<a name="new_Filter_new"></a>

### new Filter([name])

| Param | Type |
| --- | --- |
| [name] | <code>string</code> | 

<a name="Filter+filter"></a>

### filter.filter(record) ⇒ <code>boolean</code>
Determine if the specified record has to be logged.

**Kind**: instance method of <code>[Filter](#Filter)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="ConsoleHandler"></a>

## ConsoleHandler ⇐ <code>[Handler](#Handler)</code>
**Kind**: global class  
**Extends:** <code>[Handler](#Handler)</code>  

* [ConsoleHandler](#ConsoleHandler) ⇐ <code>[Handler](#Handler)</code>
    * [new ConsoleHandler([level])](#new_ConsoleHandler_new)
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * [.emit(record)](#Handler+emit)
    * [.handleError(error, [record])](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_ConsoleHandler_new"></a>

### new ConsoleHandler([level])
Console handler.


| Param | Type |
| --- | --- |
| [level] | <code>number</code> | 

<a name="Handler+setLevel"></a>

### consoleHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### consoleHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### consoleHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type |
| --- | --- |
| formatter | <code>[Formatter](#Formatter)</code> | 

<a name="Handler+format"></a>

### consoleHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handle"></a>

### consoleHandler.handle(record) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
Handle the specified logging record.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+acquire"></a>

### *consoleHandler.acquire()*
**Kind**: instance abstract method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
<a name="Handler+release"></a>

### *consoleHandler.release()*
**Kind**: instance abstract method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
<a name="Handler+emit"></a>

### consoleHandler.emit(record)
Do whatever it takes to actually log the specified logging record.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
**Overrides:** <code>[emit](#Handler+emit)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handleError"></a>

### consoleHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Filterer+addFilter"></a>

### consoleHandler.addFilter(filter)
**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+removeFilter"></a>

### consoleHandler.removeFilter(filter)
**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+filter"></a>

### consoleHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[ConsoleHandler](#ConsoleHandler)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="FileHandler"></a>

## FileHandler ⇐ <code>[Handler](#Handler)</code>
**Kind**: global class  
**Extends:** <code>[Handler](#Handler)</code>  

* [FileHandler](#FileHandler) ⇐ <code>[Handler](#Handler)</code>
    * [new FileHandler(filename, [encoding])](#new_FileHandler_new)
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * [.emit(record)](#Handler+emit)
    * [.handleError(error, [record])](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_FileHandler_new"></a>

### new FileHandler(filename, [encoding])
File handler.


| Param | Type |
| --- | --- |
| filename | <code>string</code> | 
| [encoding] | <code>string</code> | 

<a name="Handler+setLevel"></a>

### fileHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### fileHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### fileHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  

| Param | Type |
| --- | --- |
| formatter | <code>[Formatter](#Formatter)</code> | 

<a name="Handler+format"></a>

### fileHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handle"></a>

### fileHandler.handle(record) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
Handle the specified logging record.

**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+acquire"></a>

### *fileHandler.acquire()*
**Kind**: instance abstract method of <code>[FileHandler](#FileHandler)</code>  
<a name="Handler+release"></a>

### *fileHandler.release()*
**Kind**: instance abstract method of <code>[FileHandler](#FileHandler)</code>  
<a name="Handler+emit"></a>

### fileHandler.emit(record)
Do whatever it takes to actually log the specified logging record.

**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  
**Overrides:** <code>[emit](#Handler+emit)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handleError"></a>

### fileHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Filterer+addFilter"></a>

### fileHandler.addFilter(filter)
**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+removeFilter"></a>

### fileHandler.removeFilter(filter)
**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+filter"></a>

### fileHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[FileHandler](#FileHandler)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="RotatingFileHandler"></a>

## RotatingFileHandler ⇐ <code>[Handler](#Handler)</code>
**Kind**: global class  
**Extends:** <code>[Handler](#Handler)</code>  

* [RotatingFileHandler](#RotatingFileHandler) ⇐ <code>[Handler](#Handler)</code>
    * [new RotatingFileHandler(filename, [maxBytes], [backupCount], [encoding])](#new_RotatingFileHandler_new)
    * _instance_
        * [.emit(record)](#RotatingFileHandler+emit)
        * [.shouldRollover(record)](#RotatingFileHandler+shouldRollover) ⇒ <code>Promise</code>
        * [.doRollover()](#RotatingFileHandler+doRollover) ⇒ <code>Promise</code>
        * [.setLevel(level)](#Handler+setLevel)
        * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
        * [.setFormatter(formatter)](#Handler+setFormatter)
        * [.format(record)](#Handler+format) ⇒ <code>string</code>
        * [.handle(record)](#Handler+handle) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
        * *[.acquire()](#Handler+acquire)*
        * *[.release()](#Handler+release)*
        * [.handleError(error, [record])](#Handler+handleError)
        * [.addFilter(filter)](#Filterer+addFilter)
        * [.removeFilter(filter)](#Filterer+removeFilter)
        * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>
    * _static_
        * [.queueLimit](#RotatingFileHandler.queueLimit) : <code>number</code>

<a name="new_RotatingFileHandler_new"></a>

### new RotatingFileHandler(filename, [maxBytes], [backupCount], [encoding])
Handler for logging to a set of files, which switches from one file
to the next when the current file reaches a certain size.


| Param | Type |
| --- | --- |
| filename | <code>string</code> | 
| [maxBytes] | <code>number</code> | 
| [backupCount] | <code>number</code> | 
| [encoding] | <code>string</code> | 

<a name="RotatingFileHandler+emit"></a>

### rotatingFileHandler.emit(record)
Output the record to the file, catering for rollover.

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  
**Overrides:** <code>[emit](#Handler+emit)</code>  
**Throws**:

- <code>Error</code> When there are too many unhandled log events.


| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="RotatingFileHandler+shouldRollover"></a>

### rotatingFileHandler.shouldRollover(record) ⇒ <code>Promise</code>
Determine if rollover should occur.

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="RotatingFileHandler+doRollover"></a>

### rotatingFileHandler.doRollover() ⇒ <code>Promise</code>
Do a rollover.

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  
<a name="Handler+setLevel"></a>

### rotatingFileHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### rotatingFileHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### rotatingFileHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| formatter | <code>[Formatter](#Formatter)</code> | 

<a name="Handler+format"></a>

### rotatingFileHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handle"></a>

### rotatingFileHandler.handle(record) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
Handle the specified logging record.

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+acquire"></a>

### *rotatingFileHandler.acquire()*
**Kind**: instance abstract method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  
<a name="Handler+release"></a>

### *rotatingFileHandler.release()*
**Kind**: instance abstract method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  
<a name="Handler+handleError"></a>

### rotatingFileHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Filterer+addFilter"></a>

### rotatingFileHandler.addFilter(filter)
**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+removeFilter"></a>

### rotatingFileHandler.removeFilter(filter)
**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+filter"></a>

### rotatingFileHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="RotatingFileHandler.queueLimit"></a>

### RotatingFileHandler.queueLimit : <code>number</code>
**Kind**: static property of <code>[RotatingFileHandler](#RotatingFileHandler)</code>  
<a name="SyncRotatingFileHandler"></a>

## SyncRotatingFileHandler ⇐ <code>[Handler](#Handler)</code>
**Kind**: global class  
**Extends:** <code>[Handler](#Handler)</code>  

* [SyncRotatingFileHandler](#SyncRotatingFileHandler) ⇐ <code>[Handler](#Handler)</code>
    * [new SyncRotatingFileHandler(filename, [maxBytes], [backupCount], [encoding])](#new_SyncRotatingFileHandler_new)
    * [.emit(record)](#SyncRotatingFileHandler+emit)
    * [.shouldRollover(record)](#SyncRotatingFileHandler+shouldRollover) ⇒ <code>boolean</code>
    * [.doRollover()](#SyncRotatingFileHandler+doRollover) ⇒ <code>boolean</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * [.handleError(error, [record])](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_SyncRotatingFileHandler_new"></a>

### new SyncRotatingFileHandler(filename, [maxBytes], [backupCount], [encoding])

| Param | Type |
| --- | --- |
| filename | <code>string</code> | 
| [maxBytes] | <code>number</code> | 
| [backupCount] | <code>number</code> | 
| [encoding] | <code>string</code> | 

<a name="SyncRotatingFileHandler+emit"></a>

### syncRotatingFileHandler.emit(record)
**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  
**Overrides:** <code>[emit](#Handler+emit)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="SyncRotatingFileHandler+shouldRollover"></a>

### syncRotatingFileHandler.shouldRollover(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="SyncRotatingFileHandler+doRollover"></a>

### syncRotatingFileHandler.doRollover() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  
<a name="Handler+setLevel"></a>

### syncRotatingFileHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### syncRotatingFileHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### syncRotatingFileHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| formatter | <code>[Formatter](#Formatter)</code> | 

<a name="Handler+format"></a>

### syncRotatingFileHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handle"></a>

### syncRotatingFileHandler.handle(record) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
Handle the specified logging record.

**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+acquire"></a>

### *syncRotatingFileHandler.acquire()*
**Kind**: instance abstract method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  
<a name="Handler+release"></a>

### *syncRotatingFileHandler.release()*
**Kind**: instance abstract method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  
<a name="Handler+handleError"></a>

### syncRotatingFileHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Filterer+addFilter"></a>

### syncRotatingFileHandler.addFilter(filter)
**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+removeFilter"></a>

### syncRotatingFileHandler.removeFilter(filter)
**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+filter"></a>

### syncRotatingFileHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[SyncRotatingFileHandler](#SyncRotatingFileHandler)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="BrowserBasicHttpHandler"></a>

## BrowserBasicHttpHandler ⇐ <code>[Handler](#Handler)</code>
**Kind**: global class  
**Extends:** <code>[Handler](#Handler)</code>  

* [BrowserBasicHttpHandler](#BrowserBasicHttpHandler) ⇐ <code>[Handler](#Handler)</code>
    * [new BrowserBasicHttpHandler(url)](#new_BrowserBasicHttpHandler_new)
    * [.emit(record)](#BrowserBasicHttpHandler+emit)
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * [.handleError(error, [record])](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_BrowserBasicHttpHandler_new"></a>

### new BrowserBasicHttpHandler(url)

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="BrowserBasicHttpHandler+emit"></a>

### browserBasicHttpHandler.emit(record)
**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  
**Overrides:** <code>[emit](#Handler+emit)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+setLevel"></a>

### browserBasicHttpHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### browserBasicHttpHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### browserBasicHttpHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  

| Param | Type |
| --- | --- |
| formatter | <code>[Formatter](#Formatter)</code> | 

<a name="Handler+format"></a>

### browserBasicHttpHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+handle"></a>

### browserBasicHttpHandler.handle(record) ⇒ <code>[LogRecord](#module_py-logging.LogRecord)</code>
Handle the specified logging record.

**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Handler+acquire"></a>

### *browserBasicHttpHandler.acquire()*
**Kind**: instance abstract method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  
<a name="Handler+release"></a>

### *browserBasicHttpHandler.release()*
**Kind**: instance abstract method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  
<a name="Handler+handleError"></a>

### browserBasicHttpHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

<a name="Filterer+addFilter"></a>

### browserBasicHttpHandler.addFilter(filter)
**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+removeFilter"></a>

### browserBasicHttpHandler.removeFilter(filter)
**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  

| Param | Type |
| --- | --- |
| filter | <code>[Filter](#Filter)</code> | 

<a name="Filterer+filter"></a>

### browserBasicHttpHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[BrowserBasicHttpHandler](#BrowserBasicHttpHandler)</code>  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | <code>[LogRecord](#module_py-logging.LogRecord)</code> | 

