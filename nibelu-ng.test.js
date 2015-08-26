'use strict';

describe('nibelu-ng', function () {
  var cache;

  beforeEach(module('nibelu-ng'));
  beforeEach(inject(initCache));

  it('provides caches that conform to the CacheProvider interface', function () {
    expect(cache.put).to.be.a('Function');
    expect(cache.get).to.be.a('Function');
    expect(cache.remove).to.be.a('Function');
    expect(cache.removeAll).to.be.a('Function');
    expect(cache.destroy).to.be.a('Function');
    expect(cache.info).to.be.a('Function');
  });

  it('saves, loads and removes strings', function () {
    expect(cache.put('foo', 'bar')).to.eql('bar');
    expect(cache.get('foo')).to.eql('bar');

    cache.remove('foo');
    expect(cache.get('foo')).to.eql(undefined);
  });

  it('saves, loads and removes promises', function () {
    var testPromise = Q.when();
    expect(cache.put('foo2', testPromise)).to.eql(testPromise);
    expect(cache.get('foo2')).to.eql(testPromise);

    cache.remove('foo');
    expect(cache.get('foo')).to.eql(undefined);
  });

  function initCache(HttpHoard) {
    cache = new HttpHoard({
      namespace: 'testHttpHoard'
    });
    cache.removeAll();
  };
});
