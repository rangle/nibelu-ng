// Karma configuration
// Generated on Sat May 30 2015 22:19:10 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'node_modules/q/q.js',
      'node_modules/ramda/dist/ramda.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/nibelung/nibelung.js',
      'node_modules/chai/chai.js',
      'node_modules/sinon/pkg/sinon.js',
      'nibelu-ng.js',
      'nibelu-ng.test.js',
    ],

    exclude: [],
    preprocessors: {},
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,

    browsers: ['PhantomJS'],//, 'Chrome', 'Firefox'],
    reporters: ['progress', 'coverage','threshold'],
    preprocessors: {
      'nibelu-ng.js': 'coverage'
    },
    coverageReporter: {
      reporters: [{
        type: 'json'
      }, {
        type: 'html'
      }, {
        type: 'text-summary'
      }],
      dir: 'coverage'
    },
    thresholdReporter: {
      statements: 90,
      branches: 80,
      functions: 80,
      lines: 90
    }
  });
};
