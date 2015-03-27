var gulp = require('gulp');
var http = require('http');
var ecstatic = require('ecstatic');

var SERVE_PORT = 8080;

gulp.task('serve', function(){
  http.createServer(
    ecstatic({root: __dirname})
  ).listen(SERVE_PORT);

  console.log('Listening on :8080');
});
