var Readable = require('stream').Readable;
var through = require('through');
var source = require('vinyl-source-stream');
var getRawBody = require('raw-body');
var path = require('path');

function wallabyVinylAdaptor(gulpPlugin) {
    return function vinylPreprocessor(file, done) {
        var inputStream = new Readable;
        var outputStream = through();
        var result = {
            code: ''
        };
        var filename = file.path ? path.basename(file.path) : 'doesntmatterihope.js';

        inputStream.push(file.content);
        inputStream.push(null);

        inputStream
            .pipe(source(filename))
            .pipe(gulpPlugin)
            .pipe(outputStream);

        outputStream.on('data', function (data) {
            if (data.isStream()) {
                outputStream.pause();
                getRawBody(data._contents, function (err, contents) {
                    result.code += contents.toString();
                    outputStream.resume();
                })
            }
            else if (data.isBuffer()) {
                result.code += data;
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