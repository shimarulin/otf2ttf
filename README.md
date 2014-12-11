# otf2ttf
Convert OpenType font to TryeType format with FontForge.

## Features
 - CLI support,
 - Gulp support,
 - Additional font data in file stream

## Requirements
`otf2ttf` depends on [FontForge](http://fontforge.github.io/en-US/). Before using this module you need to install it.

## Installation
Install the module as CLI tool
```bash
  $ [sudo] npm install -g otf2ttf
```

If you are using `otf2ttf` programatically you should install it as project dependency: 
```bash
  $ cd /path/to/your/project
  $ npm install [--save||--save-dev] otf2ttf
```

## Usage

### Using otf2ttf from the command line
```bash
  $ otf2ttf <files> [<destination-path>]
```

#### Arguments
 - `files` - file path or comma separated string file paths
 - `destination-path` - string destination path, current directory is default

#### Examples
```bash
  $ otf2ttf "/absolute/path/to/open-type-font.otf"
  $ otf2ttf "../relative/path/to/open-type-font.otf"
  $ otf2ttf "~/with-home-dir/path/to/open-type-font.otf"
  $ otf2ttf "open-type-font.otf, another-open-type-font.otf"
  $ otf2ttf open-type-font.otf ../dest/fonts
```

### Using otf2ttf module from node.js

#### Gulp integration example
```js
var gulp = require('gulp')
  , otf2ttf = require('otf2ttf')
  ;

gulp.task('otf2ttf', [], function () {
  return gulp.src("**/*.otf")
    .pipe(otf2ttf())
    .pipe(gulp.dest(function(file){
      return "build/" + file.data.fontName
    }));
});
```

#### Options
##### debug
default: `false`


## License

[MIT](http://opensource.org/licenses/MIT)
