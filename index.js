var Readable = require('stream').Readable;
var through = require('through');
var source = require('vinyl-source-stream');
var getRawBody = require('raw-body');
var path = require('path');
var buffer = require('vinyl-buffer');
var plumber = require('gulp-plumber');

function wallabyVinylAdaptor(gulpPlugin) {
    return function vinylPreprocessor(file, done) {
        var inputStream = new Readable;
        var outputStream = through();

        var result = {
            code: ''
        };

        var filePath = file.path || 'doesntmatterihope.js';

        inputStream.push(file.content);
        inputStream.push(null);

        inputStream
            .pipe(source(filePath))
            .pipe(plumber())
            .pipe(buffer())
            .pipe(gulpPlugin)
            .pipe(outputStream);

        outputStream.on('data', function (data) {
            file.rename(path.basename(data.path));
            if (data.isStream()) {
                outputStream.pause();
                getRawBody(data._contents, function (err, contents) {
                    result.code += contents.toString();
                    outputStream.resume();
                })
            }
            else if (data.isBuffer()) {
                result.code += data.contents.toString();
            }
        });

        outputStream.on('end', function () {
            done(result);
        });

        outputStream.on('error', function (err) {
            done(err);
        });
    }
}

module.exports = wallabyVinylAdaptor;
