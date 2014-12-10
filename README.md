# otf2ttf
Convert OpenType font to TryeType format with FontForge.

## Features
 - CLI support,
 - Gulp support,
 - Additional font data in file stream

## Requirements
`otf2ttf` depends on [FontForge](http://fontforge.github.io/en-US/). Before using this module you need to install it.

## Installation
Install the module as CLI tool with `sudo npm install -g otf2ttf`, or your project dependency: `npm install [--save||--save-dev] otf2ttf`

## Usage

### with CLI
```bash
otf2ttf <files> [<destination-path>]
```

### Integration with Gulp
```js
var gulp = require('gulp'),
    otf2ttf = require('otf2ttf');

gulp.task('otf2ttf', [], function () {
    return gulp.src("**/*.otf")
        .pipe(otf2ttf())
        .pipe(gulp.dest(function(file){
            return "build/" + file.data.fontName
        }));
});
```

## Options
### debug
default: `false`


## License

[MIT](http://opensource.org/licenses/MIT)
