## Modules

<dl>
<dt><a href="#module_py-logging">py-logging</a></dt>
<dd></dd>
<dt><a href="#module_py-logging-nodekit">py-logging-nodekit</a></dt>
<dd></dd>
</dl>

<a name="module_py-logging"></a>

## py-logging

* [py-logging](#module_py-logging)
    * [.Filterer](#module_py-logging.Filterer)
        * [new Filterer()](#new_module_py-logging.Filterer_new)
    * [.Logger](#module_py-logging.Logger) ⇐ <code>Filterer</code>
        * [new Logger(parent, name, [level])](#new_module_py-logging.Logger_new)
        * [.addFilter(filter)](#Filterer+addFilter)
        * [.removeFilter(filter)](#Filterer+removeFilter)
        * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>
    * [.Handler](#module_py-logging.Handler) ⇐ <code>Filterer</code>
        * [new Handler([level])](#new_module_py-logging.Handler_new)
        * [.addFilter(filter)](#Filterer+addFilter)
        * [.removeFilter(filter)](#Filterer+removeFilter)
        * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>
    * [.Formatter](#module_py-logging.Formatter)
        * [new Formatter([format], [timeFormat])](#new_module_py-logging.Formatter_new)
    * [.Filter](#module_py-logging.Filter)
        * [new Filter([name])](#new_module_py-logging.Filter_new)
    * [.StreamHandler](#module_py-logging.StreamHandler) ⇐ <code>Handler</code>
        * [new StreamHandler([stream], [recordTextEnd])](#new_module_py-logging.StreamHandler_new)
        * [.toString()](#Handler+toString) ⇒ <code>string</code>
        * [.setLevel(level)](#Handler+setLevel)
        * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
        * [.setFormatter(formatter)](#Handler+setFormatter)
        * [.format(record)](#Handler+format) ⇒ <code>string</code>
        * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
        * *[.acquire()](#Handler+acquire)*
        * *[.release()](#Handler+release)*
        * *[.emit(record)](#Handler+emit)*
        * *[.flush()](#Handler+flush)*
        * *[.close()](#Handler+close)*
        * [.handleError(error, [record])](#Handler+handleError)
    * [.ConsoleHandler](#module_py-logging.ConsoleHandler) ⇐ <code>Handler</code>
        * [new ConsoleHandler([level], [grouping], [collapsed])](#new_module_py-logging.ConsoleHandler_new)
        * [.toString()](#Handler+toString) ⇒ <code>string</code>
        * [.setLevel(level)](#Handler+setLevel)
        * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
        * [.setFormatter(formatter)](#Handler+setFormatter)
        * [.format(record)](#Handler+format) ⇒ <code>string</code>
        * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
        * *[.acquire()](#Handler+acquire)*
        * *[.release()](#Handler+release)*
        * *[.emit(record)](#Handler+emit)*
        * *[.flush()](#Handler+flush)*
        * *[.close()](#Handler+close)*
        * [.handleError(error, [record])](#Handler+handleError)
    * [.MODULE_IDENTIFIER](#module_py-logging.MODULE_IDENTIFIER) : <code>string</code>
    * [.VERSION](#module_py-logging.VERSION) : <code>string</code>
    * [.NOTSET](#module_py-logging.NOTSET) : <code>number</code>
    * [.DEBUG](#module_py-logging.DEBUG) : <code>number</code>
    * [.INFO](#module_py-logging.INFO) : <code>number</code>
    * [.WARNING](#module_py-logging.WARNING) : <code>number</code>
    * [.ERROR](#module_py-logging.ERROR) : <code>number</code>
    * [.CRITICAL](#module_py-logging.CRITICAL) : <code>number</code>
    * [.basicConfig([options])](#module_py-logging.basicConfig)
    * [.debug()](#module_py-logging.debug)
    * [.info()](#module_py-logging.info)
    * [.warning()](#module_py-logging.warning)
    * [.error()](#module_py-logging.error)
    * [.critical()](#module_py-logging.critical)
    * [.log()](#module_py-logging.log)
    * [.getLoggerClass()](#module_py-logging.getLoggerClass) ⇒ <code>function</code>
    * [.getLogger([name])](#module_py-logging.getLogger) ⇒ <code>Logger</code>
    * [.config(config, [outerContext])](#module_py-logging.config)
    * [.getLevelName(level)](#module_py-logging.getLevelName) ⇒ <code>string</code>
    * [.LogRecord](#module_py-logging.LogRecord) : <code>Object</code>

<a name="module_py-logging.Filterer"></a>

### py-logging.Filterer
**Kind**: static class of [<code>py-logging</code>](#module_py-logging)  
<a name="new_module_py-logging.Filterer_new"></a>

#### new Filterer()
A base class for loggers and handlers which allows them to share common code.

<a name="module_py-logging.Logger"></a>

### py-logging.Logger ⇐ <code>Filterer</code>
**Kind**: static class of [<code>py-logging</code>](#module_py-logging)  
**Extends**: <code>Filterer</code>  

* [.Logger](#module_py-logging.Logger) ⇐ <code>Filterer</code>
    * [new Logger(parent, name, [level])](#new_module_py-logging.Logger_new)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_module_py-logging.Logger_new"></a>

#### new Logger(parent, name, [level])

| Param | Type | Default |
| --- | --- | --- |
| parent | <code>Logger</code> |  | 
| name | <code>string</code> |  | 
| [level] | <code>number</code> | <code>NOTSET</code> | 

<a name="Filterer+addFilter"></a>

#### logger.addFilter(filter)
**Kind**: instance method of [<code>Logger</code>](#module_py-logging.Logger)  

| Param | Type |
| --- | --- |
| filter | <code>Filter</code> | 

<a name="Filterer+removeFilter"></a>

#### logger.removeFilter(filter)
**Kind**: instance method of [<code>Logger</code>](#module_py-logging.Logger)  

| Param | Type |
| --- | --- |
| filter | <code>Filter</code> | 

<a name="Filterer+filter"></a>

#### logger.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Logger</code>](#module_py-logging.Logger)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="module_py-logging.Handler"></a>

### py-logging.Handler ⇐ <code>Filterer</code>
**Kind**: static class of [<code>py-logging</code>](#module_py-logging)  
**Extends**: <code>Filterer</code>  

* [.Handler](#module_py-logging.Handler) ⇐ <code>Filterer</code>
    * [new Handler([level])](#new_module_py-logging.Handler_new)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_module_py-logging.Handler_new"></a>

#### new Handler([level])
An abstract handler.


| Param | Type | Default |
| --- | --- | --- |
| [level] | <code>number</code> | <code>NOTSET</code> | 

<a name="Filterer+addFilter"></a>

#### handler.addFilter(filter)
**Kind**: instance method of [<code>Handler</code>](#module_py-logging.Handler)  

| Param | Type |
| --- | --- |
| filter | <code>Filter</code> | 

<a name="Filterer+removeFilter"></a>

#### handler.removeFilter(filter)
**Kind**: instance method of [<code>Handler</code>](#module_py-logging.Handler)  

| Param | Type |
| --- | --- |
| filter | <code>Filter</code> | 

<a name="Filterer+filter"></a>

#### handler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Handler</code>](#module_py-logging.Handler)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="module_py-logging.Formatter"></a>

### py-logging.Formatter
**Kind**: static class of [<code>py-logging</code>](#module_py-logging)  
<a name="new_module_py-logging.Formatter_new"></a>

#### new Formatter([format], [timeFormat])
Default formatter.


| Param | Type |
| --- | --- |
| [format] | <code>string</code> | 
| [timeFormat] | <code>string</code> | 

<a name="module_py-logging.Filter"></a>

### py-logging.Filter
**Kind**: static class of [<code>py-logging</code>](#module_py-logging)  
<a name="new_module_py-logging.Filter_new"></a>

#### new Filter([name])

| Param | Type |
| --- | --- |
| [name] | <code>string</code> | 

<a name="module_py-logging.StreamHandler"></a>

### py-logging.StreamHandler ⇐ <code>Handler</code>
**Kind**: static class of [<code>py-logging</code>](#module_py-logging)  
**Extends**: <code>Handler</code>  

* [.StreamHandler](#module_py-logging.StreamHandler) ⇐ <code>Handler</code>
    * [new StreamHandler([stream], [recordTextEnd])](#new_module_py-logging.StreamHandler_new)
    * [.toString()](#Handler+toString) ⇒ <code>string</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * *[.emit(record)](#Handler+emit)*
    * *[.flush()](#Handler+flush)*
    * *[.close()](#Handler+close)*
    * [.handleError(error, [record])](#Handler+handleError)

<a name="new_module_py-logging.StreamHandler_new"></a>

#### new StreamHandler([stream], [recordTextEnd])
Base stream handler.

A handler class which writes logging records, appropriately formatted,
to a stream. Note that this class does not close the stream, as
process.stdout or process.stderr may be used.


| Param | Type | Default |
| --- | --- | --- |
| [stream] | <code>Object</code> | <code>process.stderr</code> | 
| [recordTextEnd] | <code>string</code> | <code>&quot;\\n&quot;</code> | 

<a name="Handler+toString"></a>

#### streamHandler.toString() ⇒ <code>string</code>
Return the text representation of this handler.

**Kind**: instance method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  
<a name="Handler+setLevel"></a>

#### streamHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

#### streamHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

#### streamHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  

| Param | Type |
| --- | --- |
| formatter | <code>Formatter</code> | 

<a name="Handler+format"></a>

#### streamHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+handle"></a>

#### streamHandler.handle(record) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Handle the specified logging record.

**Kind**: instance method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+acquire"></a>

#### *streamHandler.acquire()*
**Kind**: instance abstract method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  
<a name="Handler+release"></a>

#### *streamHandler.release()*
**Kind**: instance abstract method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  
<a name="Handler+emit"></a>

#### *streamHandler.emit(record)*
Do whatever it takes to actually log the specified logging record.

**Kind**: instance abstract method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+flush"></a>

#### *streamHandler.flush()*
**Kind**: instance abstract method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  
<a name="Handler+close"></a>

#### *streamHandler.close()*
**Kind**: instance abstract method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  
<a name="Handler+handleError"></a>

#### streamHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of [<code>StreamHandler</code>](#module_py-logging.StreamHandler)  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="module_py-logging.ConsoleHandler"></a>

### py-logging.ConsoleHandler ⇐ <code>Handler</code>
**Kind**: static class of [<code>py-logging</code>](#module_py-logging)  
**Extends**: <code>Handler</code>  

* [.ConsoleHandler](#module_py-logging.ConsoleHandler) ⇐ <code>Handler</code>
    * [new ConsoleHandler([level], [grouping], [collapsed])](#new_module_py-logging.ConsoleHandler_new)
    * [.toString()](#Handler+toString) ⇒ <code>string</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * *[.emit(record)](#Handler+emit)*
    * *[.flush()](#Handler+flush)*
    * *[.close()](#Handler+close)*
    * [.handleError(error, [record])](#Handler+handleError)

<a name="new_module_py-logging.ConsoleHandler_new"></a>

#### new ConsoleHandler([level], [grouping], [collapsed])
Console handler.


| Param | Type | Default |
| --- | --- | --- |
| [level] | <code>number</code> |  | 
| [grouping] | <code>boolean</code> | <code>true</code> | 
| [collapsed] | <code>boolean</code> | <code>false</code> | 

<a name="Handler+toString"></a>

#### consoleHandler.toString() ⇒ <code>string</code>
Return the text representation of this handler.

**Kind**: instance method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  
<a name="Handler+setLevel"></a>

#### consoleHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

#### consoleHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

#### consoleHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  

| Param | Type |
| --- | --- |
| formatter | <code>Formatter</code> | 

<a name="Handler+format"></a>

#### consoleHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+handle"></a>

#### consoleHandler.handle(record) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Handle the specified logging record.

**Kind**: instance method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+acquire"></a>

#### *consoleHandler.acquire()*
**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  
<a name="Handler+release"></a>

#### *consoleHandler.release()*
**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  
<a name="Handler+emit"></a>

#### *consoleHandler.emit(record)*
Do whatever it takes to actually log the specified logging record.

**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+flush"></a>

#### *consoleHandler.flush()*
**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  
<a name="Handler+close"></a>

#### *consoleHandler.close()*
**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  
<a name="Handler+handleError"></a>

#### consoleHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of [<code>ConsoleHandler</code>](#module_py-logging.ConsoleHandler)  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="module_py-logging.MODULE_IDENTIFIER"></a>

### py-logging.MODULE_IDENTIFIER : <code>string</code>
**Kind**: static constant of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.VERSION"></a>

### py-logging.VERSION : <code>string</code>
**Kind**: static constant of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.NOTSET"></a>

### py-logging.NOTSET : <code>number</code>
**Kind**: static constant of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.DEBUG"></a>

### py-logging.DEBUG : <code>number</code>
**Kind**: static constant of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.INFO"></a>

### py-logging.INFO : <code>number</code>
**Kind**: static constant of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.WARNING"></a>

### py-logging.WARNING : <code>number</code>
**Kind**: static constant of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.ERROR"></a>

### py-logging.ERROR : <code>number</code>
**Kind**: static constant of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.CRITICAL"></a>

### py-logging.CRITICAL : <code>number</code>
**Kind**: static constant of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.basicConfig"></a>

### py-logging.basicConfig([options])
Do basic configuration for the logging system.

**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 

<a name="module_py-logging.debug"></a>

### py-logging.debug()
**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  
**See**: [debug](#Logger+debug)  
<a name="module_py-logging.info"></a>

### py-logging.info()
**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  
**See**: [info](#Logger+info)  
<a name="module_py-logging.warning"></a>

### py-logging.warning()
**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  
**See**: [warning](#Logger+warning)  
<a name="module_py-logging.error"></a>

### py-logging.error()
**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  
**See**: [error](#Logger+error)  
<a name="module_py-logging.critical"></a>

### py-logging.critical()
**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  
**See**: [critical](#Logger+critical)  
<a name="module_py-logging.log"></a>

### py-logging.log()
**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  
**See**: [log](#Logger+log)  
<a name="module_py-logging.getLoggerClass"></a>

### py-logging.getLoggerClass() ⇒ <code>function</code>
Return the class to be used when instantiating a logger.

**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  
<a name="module_py-logging.getLogger"></a>

### py-logging.getLogger([name]) ⇒ <code>Logger</code>
Return a logger with the specified name, creating it if necessary.
If no name is specified, return the root logger.

**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  

| Param | Type |
| --- | --- |
| [name] | <code>string</code> | 

<a name="module_py-logging.config"></a>

### py-logging.config(config, [outerContext])
Configure logging using a "dict" object.

**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  

| Param | Type |
| --- | --- |
| config | <code>Object</code> | 
| [outerContext] | <code>Object</code> | 

<a name="module_py-logging.getLevelName"></a>

### py-logging.getLevelName(level) ⇒ <code>string</code>
Return the textual representation of logging level.

**Kind**: static method of [<code>py-logging</code>](#module_py-logging)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="module_py-logging.LogRecord"></a>

### py-logging.LogRecord : <code>Object</code>
**Kind**: static typedef of [<code>py-logging</code>](#module_py-logging)  
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
| process | <code>number</code> | Process ID (if available). |
| processName | <code>string</code> | Process title (if available). |

<a name="module_py-logging-nodekit"></a>

## py-logging-nodekit

* [py-logging-nodekit](#module_py-logging-nodekit)
    * _static_
        * [.extend(ns)](#module_py-logging-nodekit.extend) ⇒ <code>Object</code>
        * [.basicConfig([options])](#module_py-logging-nodekit.basicConfig)
    * _inner_
        * [~FileHandler](#module_py-logging-nodekit..FileHandler) ⇐ <code>StreamHandler</code>
            * [new FileHandler(filename, [mode], [encoding], [delay])](#new_module_py-logging-nodekit..FileHandler_new)
            * [.emit(record)](#StreamHandler+emit) ⇒ <code>boolean</code>
        * [~RotatingFileHandler](#module_py-logging-nodekit..RotatingFileHandler) ⇐ <code>FileHandler</code>
            * [new RotatingFileHandler(filename, [mode], [maxBytes], [backupCount], [encoding], [delay])](#new_module_py-logging-nodekit..RotatingFileHandler_new)
            * [.shouldRollover(formatedRecord)](#module_py-logging-nodekit..RotatingFileHandler+shouldRollover) ⇒ <code>Promise.&lt;boolean&gt;</code>
            * [.doRollover()](#module_py-logging-nodekit..RotatingFileHandler+doRollover) ⇒ <code>Promise</code>
            * [.emit(record)](#module_py-logging-nodekit..RotatingFileHandler+emit) ⇒ <code>Promise</code>
            * [.close()](#module_py-logging-nodekit..RotatingFileHandler+close) ⇒ <code>Promise</code>
        * [~HttpHandler](#module_py-logging-nodekit..HttpHandler) ⇐ <code>Handler</code>
            * [new HttpHandler(url, [method], [headers])](#new_module_py-logging-nodekit..HttpHandler_new)
            * [.format(record)](#module_py-logging-nodekit..HttpHandler+format) ⇒ <code>string</code>
            * [.toString()](#Handler+toString) ⇒ <code>string</code>
            * [.setLevel(level)](#Handler+setLevel)
            * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
            * [.setFormatter(formatter)](#Handler+setFormatter)
            * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
            * *[.acquire()](#Handler+acquire)*
            * *[.release()](#Handler+release)*
            * [.emit(record)](#Handler+emit)
            * *[.flush()](#Handler+flush)*
            * *[.close()](#Handler+close)*
            * [.handleError(error, [record])](#Handler+handleError)
        * [~AsyncHandler](#module_py-logging-nodekit..AsyncHandler) ⇐ <code>Handler</code>
            * [new AsyncHandler([target])](#new_module_py-logging-nodekit..AsyncHandler_new)
            * [.setTarget(target)](#module_py-logging-nodekit..AsyncHandler+setTarget)
            * [.toString()](#Handler+toString) ⇒ <code>string</code>
            * [.setLevel(level)](#Handler+setLevel)
            * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
            * [.setFormatter(formatter)](#Handler+setFormatter)
            * [.format(record)](#Handler+format) ⇒ <code>string</code>
            * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
            * *[.acquire()](#Handler+acquire)*
            * *[.release()](#Handler+release)*
            * [.emit(record)](#Handler+emit)
            * *[.flush()](#Handler+flush)*
            * *[.close()](#Handler+close)*
            * [.handleError(error, [record])](#Handler+handleError)

<a name="module_py-logging-nodekit.extend"></a>

### py-logging-nodekit.extend(ns) ⇒ <code>Object</code>
Extends given object by functions from this module.

**Kind**: static method of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  

| Param | Type |
| --- | --- |
| ns | <code>Object</code> | 

<a name="module_py-logging-nodekit.basicConfig"></a>

### py-logging-nodekit.basicConfig([options])
Do basic configuration for the logging system.

**Kind**: static method of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 

<a name="module_py-logging-nodekit..FileHandler"></a>

### py-logging-nodekit~FileHandler ⇐ <code>StreamHandler</code>
**Kind**: inner class of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  
**Extends**: <code>StreamHandler</code>  

* [~FileHandler](#module_py-logging-nodekit..FileHandler) ⇐ <code>StreamHandler</code>
    * [new FileHandler(filename, [mode], [encoding], [delay])](#new_module_py-logging-nodekit..FileHandler_new)
    * [.emit(record)](#StreamHandler+emit) ⇒ <code>boolean</code>

<a name="new_module_py-logging-nodekit..FileHandler_new"></a>

#### new FileHandler(filename, [mode], [encoding], [delay])
File handler.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filename | <code>string</code> |  |  |
| [mode] | <code>string</code> | <code>&quot;a&quot;</code> | [https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback) |
| [encoding] | <code>string</code> | <code>&quot;utf8&quot;</code> | [https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) |
| [delay] | <code>boolean</code> | <code>false</code> |  |

<a name="StreamHandler+emit"></a>

#### fileHandler.emit(record) ⇒ <code>boolean</code>
Writes the record to the stream (with a trailing newline, if default setup).

**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  
**Overrides**: [<code>emit</code>](#StreamHandler+emit)  
**Returns**: <code>boolean</code> - false if the stream wishes for the calling code to wait
	for the 'drain' event to be emitted before continuing to write
	additional data; otherwise true.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="module_py-logging-nodekit..RotatingFileHandler"></a>

### py-logging-nodekit~RotatingFileHandler ⇐ <code>FileHandler</code>
**Kind**: inner class of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  
**Extends**: <code>FileHandler</code>  

* [~RotatingFileHandler](#module_py-logging-nodekit..RotatingFileHandler) ⇐ <code>FileHandler</code>
    * [new RotatingFileHandler(filename, [mode], [maxBytes], [backupCount], [encoding], [delay])](#new_module_py-logging-nodekit..RotatingFileHandler_new)
    * [.shouldRollover(formatedRecord)](#module_py-logging-nodekit..RotatingFileHandler+shouldRollover) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.doRollover()](#module_py-logging-nodekit..RotatingFileHandler+doRollover) ⇒ <code>Promise</code>
    * [.emit(record)](#module_py-logging-nodekit..RotatingFileHandler+emit) ⇒ <code>Promise</code>
    * [.close()](#module_py-logging-nodekit..RotatingFileHandler+close) ⇒ <code>Promise</code>

<a name="new_module_py-logging-nodekit..RotatingFileHandler_new"></a>

#### new RotatingFileHandler(filename, [mode], [maxBytes], [backupCount], [encoding], [delay])
Handler for logging to a set of files, which switches from one file
to the next when the current file reaches a certain size.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filename | <code>string</code> |  |  |
| [mode] | <code>string</code> | <code>&quot;a&quot;</code> | [https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback) |
| [maxBytes] | <code>number</code> | <code>0</code> |  |
| [backupCount] | <code>number</code> | <code>0</code> |  |
| [encoding] | <code>string</code> | <code>&quot;utf8&quot;</code> | [https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) |
| [delay] | <code>boolean</code> | <code>false</code> |  |

<a name="module_py-logging-nodekit..RotatingFileHandler+shouldRollover"></a>

#### rotatingFileHandler.shouldRollover(formatedRecord) ⇒ <code>Promise.&lt;boolean&gt;</code>
Determine if rollover should occur.

**Kind**: instance method of [<code>RotatingFileHandler</code>](#module_py-logging-nodekit..RotatingFileHandler)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if rollover should occur, false otherwise.  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| formatedRecord | <code>string</code> | Formatted (ready to actually make log) 	record. |

<a name="module_py-logging-nodekit..RotatingFileHandler+doRollover"></a>

#### rotatingFileHandler.doRollover() ⇒ <code>Promise</code>
Do a rollover.

**Kind**: instance method of [<code>RotatingFileHandler</code>](#module_py-logging-nodekit..RotatingFileHandler)  
**Access**: protected  
<a name="module_py-logging-nodekit..RotatingFileHandler+emit"></a>

#### rotatingFileHandler.emit(record) ⇒ <code>Promise</code>
Emit a record.

**Kind**: instance method of [<code>RotatingFileHandler</code>](#module_py-logging-nodekit..RotatingFileHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="module_py-logging-nodekit..RotatingFileHandler+close"></a>

#### rotatingFileHandler.close() ⇒ <code>Promise</code>
Closes the stream.

**Kind**: instance method of [<code>RotatingFileHandler</code>](#module_py-logging-nodekit..RotatingFileHandler)  
<a name="module_py-logging-nodekit..HttpHandler"></a>

### py-logging-nodekit~HttpHandler ⇐ <code>Handler</code>
**Kind**: inner class of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  
**Extends**: <code>Handler</code>  

* [~HttpHandler](#module_py-logging-nodekit..HttpHandler) ⇐ <code>Handler</code>
    * [new HttpHandler(url, [method], [headers])](#new_module_py-logging-nodekit..HttpHandler_new)
    * [.format(record)](#module_py-logging-nodekit..HttpHandler+format) ⇒ <code>string</code>
    * [.toString()](#Handler+toString) ⇒ <code>string</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * [.emit(record)](#Handler+emit)
    * *[.flush()](#Handler+flush)*
    * *[.close()](#Handler+close)*
    * [.handleError(error, [record])](#Handler+handleError)

<a name="new_module_py-logging-nodekit..HttpHandler_new"></a>

#### new HttpHandler(url, [method], [headers])
A class which sends records to a Web server, using either GET or
POST semantics.


| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [method] | <code>string</code> | <code>&quot;GET&quot;</code> | 
| [headers] | <code>Object</code> |  | 

<a name="module_py-logging-nodekit..HttpHandler+format"></a>

#### httpHandler.format(record) ⇒ <code>string</code>
Format the specified record for sending over HTTP.

**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  
**Overrides**: [<code>format</code>](#Handler+format)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+toString"></a>

#### httpHandler.toString() ⇒ <code>string</code>
Return the text representation of this handler.

**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  
<a name="Handler+setLevel"></a>

#### httpHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

#### httpHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

#### httpHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  

| Param | Type |
| --- | --- |
| formatter | <code>Formatter</code> | 

<a name="Handler+handle"></a>

#### httpHandler.handle(record) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Handle the specified logging record.

**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+acquire"></a>

#### *httpHandler.acquire()*
**Kind**: instance abstract method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  
<a name="Handler+release"></a>

#### *httpHandler.release()*
**Kind**: instance abstract method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  
<a name="Handler+emit"></a>

#### httpHandler.emit(record)
Do whatever it takes to actually log the specified logging record.

**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  
**Overrides**: [<code>emit</code>](#Handler+emit)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+flush"></a>

#### *httpHandler.flush()*
**Kind**: instance abstract method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  
<a name="Handler+close"></a>

#### *httpHandler.close()*
**Kind**: instance abstract method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  
<a name="Handler+handleError"></a>

#### httpHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="module_py-logging-nodekit..AsyncHandler"></a>

### py-logging-nodekit~AsyncHandler ⇐ <code>Handler</code>
**Kind**: inner class of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  
**Extends**: <code>Handler</code>  

* [~AsyncHandler](#module_py-logging-nodekit..AsyncHandler) ⇐ <code>Handler</code>
    * [new AsyncHandler([target])](#new_module_py-logging-nodekit..AsyncHandler_new)
    * [.setTarget(target)](#module_py-logging-nodekit..AsyncHandler+setTarget)
    * [.toString()](#Handler+toString) ⇒ <code>string</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * [.emit(record)](#Handler+emit)
    * *[.flush()](#Handler+flush)*
    * *[.close()](#Handler+close)*
    * [.handleError(error, [record])](#Handler+handleError)

<a name="new_module_py-logging-nodekit..AsyncHandler_new"></a>

#### new AsyncHandler([target])

| Param | Type |
| --- | --- |
| [target] | <code>Handler</code> | 

<a name="module_py-logging-nodekit..AsyncHandler+setTarget"></a>

#### asyncHandler.setTarget(target)
Set the target handler for this handler.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| target | <code>Handler</code> | 

<a name="Handler+toString"></a>

#### asyncHandler.toString() ⇒ <code>string</code>
Return the text representation of this handler.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  
<a name="Handler+setLevel"></a>

#### asyncHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

#### asyncHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

#### asyncHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| formatter | <code>Formatter</code> | 

<a name="Handler+format"></a>

#### asyncHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+handle"></a>

#### asyncHandler.handle(record) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Handle the specified logging record.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+acquire"></a>

#### *asyncHandler.acquire()*
**Kind**: instance abstract method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  
<a name="Handler+release"></a>

#### *asyncHandler.release()*
**Kind**: instance abstract method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  
<a name="Handler+emit"></a>

#### asyncHandler.emit(record)
Do whatever it takes to actually log the specified logging record.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  
**Overrides**: [<code>emit</code>](#Handler+emit)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+flush"></a>

#### *asyncHandler.flush()*
**Kind**: instance abstract method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  
<a name="Handler+close"></a>

#### *asyncHandler.close()*
**Kind**: instance abstract method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  
<a name="Handler+handleError"></a>

#### asyncHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

