#!/usr/bin/env node
'use strict';
var exec = require('child_process').exec
  , fs = require('fs')
  , colors = require('colors')
  , args = process.argv.slice(2)
  , fonts = args[0].split(',').map(function(font){
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
  })
  , dest = args[1] ? process.cwd() + '/' + args[1] : process.cwd()
  ;

fs.existsSync(dest) ? console.info(dest + " exist") : fs.mkdirSync(dest);
fonts.forEach(function(font){
  exec('fontforge -script "'+__dirname+'/otf2ttf.sh" "'+font+'" "'+dest+'"',
    function (error, stdout, stderr) {
//                            console.log('stderr: ' + stderr);
      if (error === null) {
        console.info('Font info: \n'.green.bold, JSON.parse(stdout));
      }
      else {
        console.error('exec error: '.bold, error);
      }
    });
});
