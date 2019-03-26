## 2.3.0 (2018-09-04)

#### Added

* Added (back) method getChild

## 2.2.0 (2018-08-21)

#### Changed

* logging.config: creating instances only if are used.

#### Added

* Added NullHandler

## 2.1.0 (2018-08-09)

#### Changed

* Filter can be just a function.
* Some small improvements.


# 2.0.0 (2018-02-18)

#### Breaking Changes

* The library is divided into 3 modules:
	* **py-logging** (core),
	* **py-logging/commonkit** (more features for both platforms),
	* **py-logging/nodekit** (features for Node.js platform, mostly handlers).
	* There is also separate package for browsers: [py-logging-browserkit](https://github.com/jose-pleonasm/py-logging-browserkit)
* Handlers are redesigned:
	* (Abstract) lock mechanism has been removed.
	* Node.js handlers are completely rewritten.
	* New API, but almost the same as the old one.
* Renamed properties of LogRecord:
	* pid -> process
	* processtitle -> processname
* Method Logger#getChild has been removed.

#### Added

* HttpHandler
* py-logging/commonkit:
	* JsonFormatter
	* WhiteListFilter
	* BlackListFilter
	* AccumulativeHandler

### 1.4.2 (2018-01-28)

#### Fixed

* Formatting Integers.

### 1.4.1 (2017-12-30)

#### Fixed

* Documentation.

## 1.4.0 (2017-12-30)

#### Added

* New handler: StreamHandler.

## 1.3.0 (2017-12-06)

#### Added

* Added richer formatting options, similar as: https://docs.python.org/2/library/stdtypes.html#string-formatting
(the flag "#" is not supported, the only supported conversion types are "s", "d" and "f").

#### Changed

* New error messages.

## 1.2.0 (2017-10-27)

#### Added

* Added properties "pid" and "processtitle" to LogRecord.
* More specific "toString" methods.

### 1.1.1 (2017-10-27)

#### Added

* Added method "hasHandlers".

#### Fixed

* Fixed logging methods

# 1.0.0 (2017-02-12)

#### Added

* Documentation.
* Logging methods directly in the module API.
* Added method "log".

#### Fixed

* FileHandler#emit (DeprecationWarning: Calling an asynchronous function without callback is deprecated.).

## 0.9.0 (2017-02-09)

#### Added

* Added a config method.
* Added changelog.
