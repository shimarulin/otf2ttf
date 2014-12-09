#!/usr/bin/env node
var exec = require('child_process').exec,
    fs = require('fs'),
    os = require('os'),
    through = require('through2'),
    async = require('async'),
    File = require('vinyl'),
    colors = require('colors'),
    logger = require('tracer').colorConsole({
        inspectOpt: {
            showHidden : true, //the object's non-enumerable properties will be shown too
            depth : 2 //tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to 2. To make it recurse indefinitely pass null.
        },
        filters : {
            log : colors.white,
            trace : colors.magenta,
            debug : colors.cyan,
            info : colors.green,
            warn : colors.yellow,
            error : [ colors.red, colors.bold ]
        }
    });

if (process.argv[1] === '/usr/bin/otf2ttf') {
    var args = process.argv.slice(2),
        fonts = args[0].split(',').map(function(font){
            var path;
            if (font.match(/^\//) === null && font.match(/^~\//) === null) {
                path = process.cwd() + '/' + font.trim();
            }
            else if (font.match(/^~\//) !== null) {
                path = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + font.trim().slice(1)
            }
            else if (font.match(/^\//) !== null) {
                path = font.trim();
            }
            return path
        }),
        dest = args[1] ? process.cwd() + '/' + args[1] : process.cwd();

    fs.existsSync(dest) ? console.info(dest + " exist") : fs.mkdirSync(dest);
    fonts.forEach(function(font){
        exec('fontforge -script "'+__dirname+'/otf2ttf.sh" "'+font+'" "'+dest+'"',
            function (error, stdout, stderr) {
//                            console.log('stderr: ' + stderr);
                if (error === null) {
                    fontInfo = JSON.parse(stdout);
                    console.info('Font info: \n'.green.bold, fontInfo);
                }
                else {
                    console.error('exec error: '.bold, error);
                }
            });
    });
}

function otf2ttf() {
    var fontInfo, fontFile;
    return through.obj(function(file, enc, cb) {
        async.series([
                function(callback){
                    exec('fontforge -script "'+__dirname+'/otf2ttf.sh" "'+file.path+'" "'+os.tmpdir()+'"',
                        function (error, stdout, stderr) {
//                            console.log('stderr: ' + stderr);
                            if (error === null) {
                                fontInfo = JSON.parse(stdout);
                                callback(null, fontInfo);
                            }
                            else {
                                console.error('exec error: '.bold, error);
                            }
                        });
                }],
            function(err, results){
                console.log('Font info: \n'.green.bold, results[0]);
                fontFile = new File({
                    cwd: "/",
                    base: os.tmpdir()+"/",
                    path: os.tmpdir()+"/"+fontInfo.fontFile,
                    contents: fs.readFileSync(os.tmpdir()+"/"+fontInfo.fontFile)
                });
                this.push(fontFile);
                return cb();
            }.bind(this));
    });
}

module.exports = otf2ttf;