'use strict';
var assert = require('assert');
var share = require('../lib/share');

describe('vig #share', function () {
  it('should handle callback ', function (done) {
    var cb = share.onPassed(null, null, null, function (info) {
      assert(info === 'info');
      assert(true);
      done();
    });
    cb(false, 'info');
  });
});
