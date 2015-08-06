# nibelu-ng: AngularJS Wrappers for Nibelung

[![Circle CI](https://circleci.com/gh/rangle/nibelu-ng/tree/master.svg?style=svg)](https://circleci.com/gh/rangle/nibelu-ng/tree/master)

Brings the power of [nibelung](https://github.com/rangle/nibelu-ng) to AngularJS.

This library does two things:

* It exposes nibelung as an Angular module and service.

```javascript
angular.module('your-module', ['nibelu-ng'])
  .service('yourService', function (nibelung) {
    var cache = new nibelung.Hoard({
      namespace: 'foo'
    });
  })
```

* It provides an [$http](https://docs.angularjs.org/api/ng/service/$http#!)-compatible
cache backed by Nibelung, which allows you to specify TTLs, persistence, and other
goodies for your `$http` calls.

```javascript
.service('yourService', function (HttpHoard) {
  var tenSecondCache = new HttpHoard({
    namespace: 'httpCache',
    ttlMilliseconds: 10000 // Cache records will expire 10 seconds after completion.
  });

  function getStuffWithTenSecondCache(url) {
    return $http.get('foo/bar', {
      cache: tenSecondCache
    });
  }

  return {
    getStuffWithTenSecondCache: getStuffWithTenSecondCache
  };
});
```

See the [original library](https://github.com/rangle/nibelu-ng) for all the
config options.

You can get it with the usual suspects:

```
bower install nibelu-ng
```

```
npm install nibelu-ng
```
