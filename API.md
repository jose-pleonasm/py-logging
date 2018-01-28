## Modules

<dl>
<dt><a href="#module_py-logging">py-logging</a></dt>
<dd></dd>
<dt><a href="#module_py-logging-nodekit">py-logging-nodekit</a></dt>
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
<dt><a href="#StreamHandler">StreamHandler</a> ⇐ <code><a href="#Handler">Handler</a></code></dt>
<dd></dd>
<dt><a href="#ConsoleHandler">ConsoleHandler</a> ⇐ <code><a href="#Handler">Handler</a></code></dt>
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
    * [.basicConfig([options])](#module_py-logging.basicConfig)
    * [.debug()](#module_py-logging.debug)
    * [.info()](#module_py-logging.info)
    * [.warning()](#module_py-logging.warning)
    * [.error()](#module_py-logging.error)
    * [.critical()](#module_py-logging.critical)
    * [.log()](#module_py-logging.log)
    * [.getLoggerClass()](#module_py-logging.getLoggerClass) ⇒ <code>function</code>
    * [.getLogger([name])](#module_py-logging.getLogger) ⇒ [<code>Logger</code>](#Logger)
    * [.config(config, [outerContext])](#module_py-logging.config)
    * [.getLevelName(level)](#module_py-logging.getLevelName) ⇒ <code>string</code>
    * [.LogRecord](#module_py-logging.LogRecord) : <code>Object</code>

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

### py-logging.getLogger([name]) ⇒ [<code>Logger</code>](#Logger)
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
        * [~FileHandler](#module_py-logging-nodekit..FileHandler) ⇐ [<code>StreamHandler</code>](#StreamHandler)
            * [new FileHandler(filename, [mode], [encoding], [delay])](#new_module_py-logging-nodekit..FileHandler_new)
            * [.emit(record)](#StreamHandler+emit) ⇒ <code>boolean</code>
            * [.toString()](#Handler+toString) ⇒ <code>string</code>
            * [.setLevel(level)](#Handler+setLevel)
            * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
            * [.setFormatter(formatter)](#Handler+setFormatter)
            * [.format(record)](#Handler+format) ⇒ <code>string</code>
            * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
            * *[.acquire()](#Handler+acquire)*
            * *[.release()](#Handler+release)*
            * *[.flush()](#Handler+flush)*
            * *[.close()](#Handler+close)*
            * [.handleError(error, [record])](#Handler+handleError)
            * [.addFilter(filter)](#Filterer+addFilter)
            * [.removeFilter(filter)](#Filterer+removeFilter)
            * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>
        * [~RotatingFileHandler](#module_py-logging-nodekit..RotatingFileHandler) ⇐ <code>FileHandler</code>
            * [new RotatingFileHandler(filename, [mode], [maxBytes], [backupCount], [encoding], [delay])](#new_module_py-logging-nodekit..RotatingFileHandler_new)
            * [.shouldRollover(formatedRecord)](#module_py-logging-nodekit..RotatingFileHandler+shouldRollover) ⇒ <code>Promise.&lt;boolean&gt;</code>
            * [.doRollover()](#module_py-logging-nodekit..RotatingFileHandler+doRollover) ⇒ <code>Promise</code>
            * [.emit(record)](#module_py-logging-nodekit..RotatingFileHandler+emit) ⇒ <code>Promise</code>
            * [.close()](#module_py-logging-nodekit..RotatingFileHandler+close) ⇒ <code>Promise</code>
        * [~HttpHandler](#module_py-logging-nodekit..HttpHandler) ⇐ [<code>Handler</code>](#Handler)
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
            * [.addFilter(filter)](#Filterer+addFilter)
            * [.removeFilter(filter)](#Filterer+removeFilter)
            * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>
        * [~AsyncHandler](#module_py-logging-nodekit..AsyncHandler) ⇐ [<code>Handler</code>](#Handler)
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
            * [.addFilter(filter)](#Filterer+addFilter)
            * [.removeFilter(filter)](#Filterer+removeFilter)
            * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

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

### py-logging-nodekit~FileHandler ⇐ [<code>StreamHandler</code>](#StreamHandler)
**Kind**: inner class of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  
**Extends**: [<code>StreamHandler</code>](#StreamHandler)  

* [~FileHandler](#module_py-logging-nodekit..FileHandler) ⇐ [<code>StreamHandler</code>](#StreamHandler)
    * [new FileHandler(filename, [mode], [encoding], [delay])](#new_module_py-logging-nodekit..FileHandler_new)
    * [.emit(record)](#StreamHandler+emit) ⇒ <code>boolean</code>
    * [.toString()](#Handler+toString) ⇒ <code>string</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * *[.flush()](#Handler+flush)*
    * *[.close()](#Handler+close)*
    * [.handleError(error, [record])](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

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

<a name="Handler+toString"></a>

#### fileHandler.toString() ⇒ <code>string</code>
Return the text representation of this handler.

**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  
<a name="Handler+setLevel"></a>

#### fileHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

#### fileHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

#### fileHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  

| Param | Type |
| --- | --- |
| formatter | [<code>Formatter</code>](#Formatter) | 

<a name="Handler+format"></a>

#### fileHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+handle"></a>

#### fileHandler.handle(record) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Handle the specified logging record.

**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+acquire"></a>

#### *fileHandler.acquire()*
**Kind**: instance abstract method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  
<a name="Handler+release"></a>

#### *fileHandler.release()*
**Kind**: instance abstract method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  
<a name="Handler+flush"></a>

#### *fileHandler.flush()*
**Kind**: instance abstract method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  
<a name="Handler+close"></a>

#### *fileHandler.close()*
**Kind**: instance abstract method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  
<a name="Handler+handleError"></a>

#### fileHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Filterer+addFilter"></a>

#### fileHandler.addFilter(filter)
**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+removeFilter"></a>

#### fileHandler.removeFilter(filter)
**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+filter"></a>

#### fileHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>FileHandler</code>](#module_py-logging-nodekit..FileHandler)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

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

### py-logging-nodekit~HttpHandler ⇐ [<code>Handler</code>](#Handler)
**Kind**: inner class of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  
**Extends**: [<code>Handler</code>](#Handler)  

* [~HttpHandler](#module_py-logging-nodekit..HttpHandler) ⇐ [<code>Handler</code>](#Handler)
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
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

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
| formatter | [<code>Formatter</code>](#Formatter) | 

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

<a name="Filterer+addFilter"></a>

#### httpHandler.addFilter(filter)
**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+removeFilter"></a>

#### httpHandler.removeFilter(filter)
**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+filter"></a>

#### httpHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>HttpHandler</code>](#module_py-logging-nodekit..HttpHandler)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="module_py-logging-nodekit..AsyncHandler"></a>

### py-logging-nodekit~AsyncHandler ⇐ [<code>Handler</code>](#Handler)
**Kind**: inner class of [<code>py-logging-nodekit</code>](#module_py-logging-nodekit)  
**Extends**: [<code>Handler</code>](#Handler)  

* [~AsyncHandler](#module_py-logging-nodekit..AsyncHandler) ⇐ [<code>Handler</code>](#Handler)
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
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_module_py-logging-nodekit..AsyncHandler_new"></a>

#### new AsyncHandler([target])

| Param | Type |
| --- | --- |
| [target] | [<code>Handler</code>](#Handler) | 

<a name="module_py-logging-nodekit..AsyncHandler+setTarget"></a>

#### asyncHandler.setTarget(target)
Set the target handler for this handler.

**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| target | [<code>Handler</code>](#Handler) | 

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
| formatter | [<code>Formatter</code>](#Formatter) | 

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

<a name="Filterer+addFilter"></a>

#### asyncHandler.addFilter(filter)
**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+removeFilter"></a>

#### asyncHandler.removeFilter(filter)
**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+filter"></a>

#### asyncHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>AsyncHandler</code>](#module_py-logging-nodekit..AsyncHandler)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

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
**Kind**: instance method of [<code>Filterer</code>](#Filterer)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+removeFilter"></a>

### filterer.removeFilter(filter)
**Kind**: instance method of [<code>Filterer</code>](#Filterer)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+filter"></a>

### filterer.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Filterer</code>](#Filterer)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Logger"></a>

## Logger ⇐ [<code>Filterer</code>](#Filterer)
**Kind**: global class  
**Extends**: [<code>Filterer</code>](#Filterer)  

* [Logger](#Logger) ⇐ [<code>Filterer</code>](#Filterer)
    * [new Logger(parent, name, [level])](#new_Logger_new)
    * _instance_
        * [.toString()](#Logger+toString) ⇒ <code>string</code>
        * [.getName()](#Logger+getName) ⇒ <code>string</code>
        * [.getEffectiveLevel()](#Logger+getEffectiveLevel) ⇒ <code>number</code>
        * [.isEnabledFor(level)](#Logger+isEnabledFor) ⇒ <code>boolean</code>
        * [.setLevel(level)](#Logger+setLevel)
        * [.addHandler(handler)](#Logger+addHandler)
        * [.removeHandler(handler)](#Logger+removeHandler)
        * [.hasHandlers()](#Logger+hasHandlers) ⇒ <code>boolean</code>
        * [.debug(msg, [error], [extra])](#Logger+debug)
        * [.info(msg, [error], [extra])](#Logger+info)
        * [.warning(msg, [error], [extra])](#Logger+warning)
        * [.error(msg, [error], [extra])](#Logger+error)
        * [.critical(msg, [error], [extra])](#Logger+critical)
        * [.log(level, msg, [error], [extra])](#Logger+log)
        * [.makeRecord(level, msg, [error], [extra])](#Logger+makeRecord) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
        * [.addFilter(filter)](#Filterer+addFilter)
        * [.removeFilter(filter)](#Filterer+removeFilter)
        * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>
    * _static_
        * [.getLevelName(level)](#Logger.getLevelName) ⇒ <code>string</code>
        * [.getLevelByName(levelName)](#Logger.getLevelByName) ⇒ <code>number</code>

<a name="new_Logger_new"></a>

### new Logger(parent, name, [level])

| Param | Type | Default |
| --- | --- | --- |
| parent | [<code>Logger</code>](#Logger) |  | 
| name | <code>string</code> |  | 
| [level] | <code>number</code> | <code>NOTSET</code> | 

<a name="Logger+toString"></a>

### logger.toString() ⇒ <code>string</code>
Return the text representation of this logger.

**Kind**: instance method of [<code>Logger</code>](#Logger)  
<a name="Logger+getName"></a>

### logger.getName() ⇒ <code>string</code>
Return the name of this logger.

**Kind**: instance method of [<code>Logger</code>](#Logger)  
<a name="Logger+getEffectiveLevel"></a>

### logger.getEffectiveLevel() ⇒ <code>number</code>
Return the effective level for this logger.

**Kind**: instance method of [<code>Logger</code>](#Logger)  
<a name="Logger+isEnabledFor"></a>

### logger.isEnabledFor(level) ⇒ <code>boolean</code>
Is this logger enabled for specified level?

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Logger+setLevel"></a>

### logger.setLevel(level)
Set the logging level of this logger.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Logger+addHandler"></a>

### logger.addHandler(handler)
Add the specified handler to this logger.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| handler | [<code>Handler</code>](#Handler) | 

<a name="Logger+removeHandler"></a>

### logger.removeHandler(handler)
Remove the specified handler from this logger.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| handler | [<code>Handler</code>](#Handler) | 

<a name="Logger+hasHandlers"></a>

### logger.hasHandlers() ⇒ <code>boolean</code>
See if this logger has any handlers configured.

**Kind**: instance method of [<code>Logger</code>](#Logger)  
<a name="Logger+debug"></a>

### logger.debug(msg, [error], [extra])
Log msg with severity 'DEBUG'.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+info"></a>

### logger.info(msg, [error], [extra])
Log msg with severity 'INFO'.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+warning"></a>

### logger.warning(msg, [error], [extra])
Log msg with severity 'WARNING'.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+error"></a>

### logger.error(msg, [error], [extra])
Log msg with severity 'ERROR'.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+critical"></a>

### logger.critical(msg, [error], [extra])
Log msg with severity 'CRITICAL'.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+log"></a>

### logger.log(level, msg, [error], [extra])
Log msg with specified severity.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Logger+makeRecord"></a>

### logger.makeRecord(level, msg, [error], [extra]) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Create a LogRecord object.

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 
| msg | <code>string</code> | 
| [error] | <code>Object</code> | 
| [extra] | <code>Object</code> | 

<a name="Filterer+addFilter"></a>

### logger.addFilter(filter)
**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+removeFilter"></a>

### logger.removeFilter(filter)
**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+filter"></a>

### logger.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Logger.getLevelName"></a>

### Logger.getLevelName(level) ⇒ <code>string</code>
Return the textual representation of logging level.

**Kind**: static method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Logger.getLevelByName"></a>

### Logger.getLevelByName(levelName) ⇒ <code>number</code>
Return value of the level name.

**Kind**: static method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| levelName | <code>string</code> | 

<a name="Handler"></a>

## Handler ⇐ [<code>Filterer</code>](#Filterer)
**Kind**: global class  
**Extends**: [<code>Filterer</code>](#Filterer)  

* [Handler](#Handler) ⇐ [<code>Filterer</code>](#Filterer)
    * [new Handler([level])](#new_Handler_new)
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
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_Handler_new"></a>

### new Handler([level])
An abstract handler.


| Param | Type | Default |
| --- | --- | --- |
| [level] | <code>number</code> | <code>NOTSET</code> | 

<a name="Handler+toString"></a>

### handler.toString() ⇒ <code>string</code>
Return the text representation of this handler.

**Kind**: instance method of [<code>Handler</code>](#Handler)  
<a name="Handler+setLevel"></a>

### handler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### handler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### handler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| formatter | [<code>Formatter</code>](#Formatter) | 

<a name="Handler+format"></a>

### handler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+handle"></a>

### handler.handle(record) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Handle the specified logging record.

**Kind**: instance method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+acquire"></a>

### *handler.acquire()*
**Kind**: instance abstract method of [<code>Handler</code>](#Handler)  
<a name="Handler+release"></a>

### *handler.release()*
**Kind**: instance abstract method of [<code>Handler</code>](#Handler)  
<a name="Handler+emit"></a>

### *handler.emit(record)*
Do whatever it takes to actually log the specified logging record.

**Kind**: instance abstract method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+flush"></a>

### *handler.flush()*
**Kind**: instance abstract method of [<code>Handler</code>](#Handler)  
<a name="Handler+close"></a>

### *handler.close()*
**Kind**: instance abstract method of [<code>Handler</code>](#Handler)  
<a name="Handler+handleError"></a>

### handler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Filterer+addFilter"></a>

### handler.addFilter(filter)
**Kind**: instance method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+removeFilter"></a>

### handler.removeFilter(filter)
**Kind**: instance method of [<code>Handler</code>](#Handler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+filter"></a>

### handler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Handler</code>](#Handler)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Formatter"></a>

## Formatter
**Kind**: global class  

* [Formatter](#Formatter)
    * [new Formatter([format], [timeFormat])](#new_Formatter_new)
    * [.toString()](#Formatter+toString) ⇒ <code>string</code>
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

<a name="Formatter+toString"></a>

### formatter.toString() ⇒ <code>string</code>
Return the text representation of this formatter.

**Kind**: instance method of [<code>Formatter</code>](#Formatter)  
<a name="Formatter+formatTime"></a>

### formatter.formatTime(record) ⇒ <code>string</code>
Return the creation time of the specified LogRecord as formatted text.

**Kind**: instance method of [<code>Formatter</code>](#Formatter)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Formatter+formatError"></a>

### formatter.formatError(error) ⇒ <code>string</code>
Return the specified Error object as formatted text.

**Kind**: instance method of [<code>Formatter</code>](#Formatter)  

| Param | Type |
| --- | --- |
| error | <code>Object</code> | 

<a name="Formatter+format"></a>

### formatter.format(record) ⇒ <code>string</code>
Return the specified LogRecord as formatted text.

**Kind**: instance method of [<code>Formatter</code>](#Formatter)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Filter"></a>

## Filter
**Kind**: global class  

* [Filter](#Filter)
    * [new Filter([name])](#new_Filter_new)
    * [.toString()](#Filter+toString) ⇒ <code>string</code>
    * [.filter(record)](#Filter+filter) ⇒ <code>boolean</code>

<a name="new_Filter_new"></a>

### new Filter([name])

| Param | Type |
| --- | --- |
| [name] | <code>string</code> | 

<a name="Filter+toString"></a>

### filter.toString() ⇒ <code>string</code>
Return the text representation of this filter.

**Kind**: instance method of [<code>Filter</code>](#Filter)  
<a name="Filter+filter"></a>

### filter.filter(record) ⇒ <code>boolean</code>
Determine if the specified record has to be logged.

**Kind**: instance method of [<code>Filter</code>](#Filter)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed to be processed.
	True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="StreamHandler"></a>

## StreamHandler ⇐ [<code>Handler</code>](#Handler)
**Kind**: global class  
**Extends**: [<code>Handler</code>](#Handler)  

* [StreamHandler](#StreamHandler) ⇐ [<code>Handler</code>](#Handler)
    * [new StreamHandler([stream], [recordTextEnd])](#new_StreamHandler_new)
    * [.emit(record)](#StreamHandler+emit) ⇒ <code>boolean</code>
    * [.toString()](#Handler+toString) ⇒ <code>string</code>
    * [.setLevel(level)](#Handler+setLevel)
    * [.isEnabledFor(level)](#Handler+isEnabledFor) ⇒ <code>boolean</code>
    * [.setFormatter(formatter)](#Handler+setFormatter)
    * [.format(record)](#Handler+format) ⇒ <code>string</code>
    * [.handle(record)](#Handler+handle) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
    * *[.acquire()](#Handler+acquire)*
    * *[.release()](#Handler+release)*
    * *[.flush()](#Handler+flush)*
    * *[.close()](#Handler+close)*
    * [.handleError(error, [record])](#Handler+handleError)
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_StreamHandler_new"></a>

### new StreamHandler([stream], [recordTextEnd])
Base stream handler.

A handler class which writes logging records, appropriately formatted,
to a stream. Note that this class does not close the stream, as
process.stdout or process.stderr may be used.


| Param | Type | Default |
| --- | --- | --- |
| [stream] | <code>Object</code> | <code>process.stderr</code> | 
| [recordTextEnd] | <code>string</code> | <code>&quot;\\n&quot;</code> | 

<a name="StreamHandler+emit"></a>

### streamHandler.emit(record) ⇒ <code>boolean</code>
Writes the record to the stream (with a trailing newline, if default setup).

**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  
**Overrides**: [<code>emit</code>](#Handler+emit)  
**Returns**: <code>boolean</code> - false if the stream wishes for the calling code to wait
	for the 'drain' event to be emitted before continuing to write
	additional data; otherwise true.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+toString"></a>

### streamHandler.toString() ⇒ <code>string</code>
Return the text representation of this handler.

**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  
<a name="Handler+setLevel"></a>

### streamHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### streamHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### streamHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  

| Param | Type |
| --- | --- |
| formatter | [<code>Formatter</code>](#Formatter) | 

<a name="Handler+format"></a>

### streamHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+handle"></a>

### streamHandler.handle(record) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Handle the specified logging record.

**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+acquire"></a>

### *streamHandler.acquire()*
**Kind**: instance abstract method of [<code>StreamHandler</code>](#StreamHandler)  
<a name="Handler+release"></a>

### *streamHandler.release()*
**Kind**: instance abstract method of [<code>StreamHandler</code>](#StreamHandler)  
<a name="Handler+flush"></a>

### *streamHandler.flush()*
**Kind**: instance abstract method of [<code>StreamHandler</code>](#StreamHandler)  
<a name="Handler+close"></a>

### *streamHandler.close()*
**Kind**: instance abstract method of [<code>StreamHandler</code>](#StreamHandler)  
<a name="Handler+handleError"></a>

### streamHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Filterer+addFilter"></a>

### streamHandler.addFilter(filter)
**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+removeFilter"></a>

### streamHandler.removeFilter(filter)
**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+filter"></a>

### streamHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>StreamHandler</code>](#StreamHandler)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="ConsoleHandler"></a>

## ConsoleHandler ⇐ [<code>Handler</code>](#Handler)
**Kind**: global class  
**Extends**: [<code>Handler</code>](#Handler)  

* [ConsoleHandler](#ConsoleHandler) ⇐ [<code>Handler</code>](#Handler)
    * [new ConsoleHandler([level], [grouping], [collapsed])](#new_ConsoleHandler_new)
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
    * [.addFilter(filter)](#Filterer+addFilter)
    * [.removeFilter(filter)](#Filterer+removeFilter)
    * [.filter(record)](#Filterer+filter) ⇒ <code>boolean</code>

<a name="new_ConsoleHandler_new"></a>

### new ConsoleHandler([level], [grouping], [collapsed])
Console handler.


| Param | Type | Default |
| --- | --- | --- |
| [level] | <code>number</code> |  | 
| [grouping] | <code>boolean</code> | <code>true</code> | 
| [collapsed] | <code>boolean</code> | <code>false</code> | 

<a name="Handler+toString"></a>

### consoleHandler.toString() ⇒ <code>string</code>
Return the text representation of this handler.

**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  
<a name="Handler+setLevel"></a>

### consoleHandler.setLevel(level)
Set the logging level of this handler.

**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+isEnabledFor"></a>

### consoleHandler.isEnabledFor(level) ⇒ <code>boolean</code>
Is this handler enabled for specified level?

**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  

| Param | Type |
| --- | --- |
| level | <code>number</code> | 

<a name="Handler+setFormatter"></a>

### consoleHandler.setFormatter(formatter)
Set the formatter for this handler.

**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  

| Param | Type |
| --- | --- |
| formatter | [<code>Formatter</code>](#Formatter) | 

<a name="Handler+format"></a>

### consoleHandler.format(record) ⇒ <code>string</code>
Format the specified record.

**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+handle"></a>

### consoleHandler.handle(record) ⇒ [<code>LogRecord</code>](#module_py-logging.LogRecord)
Handle the specified logging record.

**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+acquire"></a>

### *consoleHandler.acquire()*
**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#ConsoleHandler)  
<a name="Handler+release"></a>

### *consoleHandler.release()*
**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#ConsoleHandler)  
<a name="Handler+emit"></a>

### consoleHandler.emit(record)
Do whatever it takes to actually log the specified logging record.

**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  
**Overrides**: [<code>emit</code>](#Handler+emit)  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Handler+flush"></a>

### *consoleHandler.flush()*
**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#ConsoleHandler)  
<a name="Handler+close"></a>

### *consoleHandler.close()*
**Kind**: instance abstract method of [<code>ConsoleHandler</code>](#ConsoleHandler)  
<a name="Handler+handleError"></a>

### consoleHandler.handleError(error, [record])
Handle errors which occur during an emit() call.

**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| [record] | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

<a name="Filterer+addFilter"></a>

### consoleHandler.addFilter(filter)
**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+removeFilter"></a>

### consoleHandler.removeFilter(filter)
**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  

| Param | Type |
| --- | --- |
| filter | [<code>Filter</code>](#Filter) | 

<a name="Filterer+filter"></a>

### consoleHandler.filter(record) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ConsoleHandler</code>](#ConsoleHandler)  
**Returns**: <code>boolean</code> - Returns false if specified record is not supposed
	to be processed. True otherwise.  

| Param | Type |
| --- | --- |
| record | [<code>LogRecord</code>](#module_py-logging.LogRecord) | 

