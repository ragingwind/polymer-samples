# wrap-promise

[![Build Status](https://travis-ci.org/shinnn/wrap-promise.svg?branch=master)](https://travis-ci.org/shinnn/wrap-promise)
[![Build status](https://ci.appveyor.com/api/projects/status/hs2fbpxk34gbteub?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/wrap-promise)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/wrap-promise.svg)](https://coveralls.io/r/shinnn/wrap-promise)
[![Dependency Status](https://david-dm.org/shinnn/wrap-promise.svg)](https://david-dm.org/shinnn/wrap-promise)
[![devDependency Status](https://david-dm.org/shinnn/wrap-promise/dev-status.svg)](https://david-dm.org/shinnn/wrap-promise#info=devDependencies)

Like `new Promise()`, but prevents implicit rejection

## Comparison

### Using the native `new Promise()`

```javascript
var fs = require('fs');

new Promise(function(resolve, reject) {
  // Node's fs.readFile throws a type error when the first argument is not a string.

  fs.readFile(123, function(err, buf) { // doesn't throw, but calls `onRejected` function
    if (err) {
      reject(err);
      return;
    }
    resolve(buf);
  });
}).catch(onRejected);

function onRejected() {
  console.log('This function should be called.');
}
```

### Using *wrap-promise*

```javascript
var fs = require('fs');
var wrapPromise = require('wrap-promise');

wrapPromise(function(resolve, reject) {
  fs.readFile(123, function(err, buf) { // doesn't call `onRejected` but throws immediately
    if (err) {
      reject(err);
      return;
    }
    resolve(buf);
  });
}).catch(onRejected);

function onRejected() {
  console.log('This function should not be called.');
}
```

[According to the Promise specification](https://github.com/domenic/promises-unwrapping/blob/2a942729249c2490507a1ae6c9a24f8fa11a98e4/reference-implementation/lib/testable-implementation.js#L293-L297), a `promise` will [be rejected implicitly when an error is thrown in the constructor callback](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-exceptions-and-promises). The only (and the biggest) difference is that *wrap-promise* immediately throws an error in such a case.

## Installation

### Package managers

#### [npm](https://www.npmjs.com/)

```
npm install wrap-promise
```

#### [Bower](http://bower.io/)

```
bower install wrap-promise
```

#### [Duo](http://duojs.org/)

```javascript
var wrapPromise = require('shinnn/wrap-promise');
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/wrap-promise/master/wrap-promise.js)

## API

### wrapPromise(*fn*)

*fn*: `Function`  
Return: `Object` ([Promise](http://promisesaplus.com/))

It can be used in the same way as `new Promise()` but [`new` operator](http://www.ecma-international.org/ecma-262/5.1/#sec-11.2.2) is not needed.

### wrapPromise.Promise

Type: `Function`  
Default: global `Promise` or [`require('es6-promise').Promise`](https://github.com/jakearchibald/es6-promise#nodejs)

The `Promise` constructor used in `wrapPromise` function.

#### On CommonJS-based environment (e.g. [Node](http://nodejs.org/))

By default it uses the global `Promise` constructor if available, otherwise it [`require`](http://nodejs.org/api/globals.html#globals_require)s [es6-promise](https://github.com/jakearchibald/es6-promise) and use its `Promise` property.

If you don't need the fallback, use [`no-fallback.js`](https://github.com/shinnn/wrap-promise/blob/master/no-fallback.js) instead. (Useful for [Browserify](http://browserify.org/))

```javascript
var wrapPromise = require('wrap-promise/no-fallback');
```

#### On non-CommonJS environment

It uses the global `Promise` constructor without any fallbacks. Before using `wrapPromise`, you must load `Promise` polyfill if `Promise` doesn't exist by default.

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
