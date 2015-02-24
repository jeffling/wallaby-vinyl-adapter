![](https://travis-ci.org/jeffling/wallaby-vinyl-adapter.svg)
# wallaby-vinyl-adapter
This simple vinyl adapter will allow you to use gulp/vinyl plugins with [wallaby.js](http://wallabyjs.com). 

This is early in development, so any issues and pull requests are greatly appreciate.

## USAGE
The adapter takes in a gulp/vinyl plugin and returns `function(file, done)`. Just pass in the options like you would in gulp.

```
var header = require('gulp-header');
var vinylAdapter = require('wallaby-vinyl-adapter');

var partialConfig = {
  preprocessors: {
    "src/**/*.js": vinylAdapter(header("// This comment will go on top of all js files"));
  }
}
```
