(function (global) {
  'use strict';

  var nibelung = typeof exports === 'object' ?
    module.require('nibelung') :
    global.nibelung;
  var angular = typeof exports === 'object' ?
    module.require('angular') :
    global.angular;

  angular.module('nibelu-ng', [])
    /**
     * Convenience wrapper for people wanting to use nibelung Hoard's directly
     * in an angular app.
     */
    .service('nibelung', function () {
      return window.nibelung;
    })

    /**
     * Turns a nibelung Hoard into an object satisfying the contract for
     * an AngularJS CacheProvider.Cache.  This requires some fancy footwork
     * to handle the fact that during an HTTP call, $http caches the promise
     * while the response is still pending.  We don't want to save the promise
     * in the hoard or a short TTL could delete it before the HTTP call is
     * done.  Nibelung also stringifies its values and therefore won't
     * reconstruct a promise object correctly.
     */
    .factory('HttpHoard', function (nibelung) {
      var _promiseCache = {};

      return function HttpHoard(options) {
        var cache = new nibelung.Hoard(options);

        this.put = function (k, v) {
          if (v && typeof v.then === 'function') {
            _promiseCache[k] = v;
          } else {
            cache.putOne(k, v);
            delete _promiseCache[k];
          }
          return v;
        };

        this.get = function (k) {
          var v = cache.getOne(k) || _promiseCache[k];
          return v;
        };

        this.remove = function (k) {
          delete _promiseCache[k];
          cache.removeOne(k);
        };

        this.removeAll = function () {
          cache.clear();
        };

        this.destroy = function () {
          cache.clear();
        };

        this.info = function () {
          return {
            id: options.namespace,
            size: cache.getLatest().length
          };
        };
      };
    });
})(this);
