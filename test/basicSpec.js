var adaptor = require('../');
var assert = require('assert');
var header = require('gulp-header');

describe('basic functionality', function () {
    it('should be able to use the gulp-header plugin', function (testDone) {
        var testFile = {
            content: 'asdf'
        };

        function done(obj) {
            assert.equal(obj.code, 'header\nasdf');
            testDone()
        }

        adaptor(header('header\n'))(testFile, done);
    });
});
