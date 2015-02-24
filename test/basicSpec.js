var adaptor = require('../');
var assert = require('assert');
var header = require('gulp-header');
var rename = require('gulp-rename');

describe('basic functionality', function () {
    it('should be able to use the gulp-header plugin', function (testDone) {
        var testFile = {
            content: 'asdf',
            path: __dirname + 'asdf.js',
            rename: function() {}
        };

        function done(obj) {
            assert.equal(obj.code, 'header\nasdf');
            testDone()
        }

        adaptor(header('header\n'))(testFile, done);
    });

    it('should rename files', function (testDone) {
        var testFile = {
            content: 'asdf',
            path: __dirname + 'asdf.js',
            rename: function (name) {
                assert(name, 'fdsa.js');
                testDone()
            }
        };

        var done = function(){};

        adaptor(rename('fdsa.js'))(testFile, done);
    });
});
