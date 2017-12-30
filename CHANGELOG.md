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

## 1.1.1 (2017-10-27)

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
