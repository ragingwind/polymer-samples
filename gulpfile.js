var gulp = require('gulp');
var ghpage = require('gulp-gh-pages');
var http = require('http');
var ecstatic = require('ecstatic')({
  root:  __dirname + '/samples',
  showDir: true,
  autoIndex: true,
});

var SERVE_PORT = 8080;

gulp.task('ghpage', function () {
  return gulp.src("./samples/**/*")
      .pipe(ghpage({
        remoteUrl:'https://github.com/ragingwind/polymer-samples.git'
      }));
});

gulp.task('serve', function() {
  http.createServer(function(req, res, next) {
    return ecstatic(req, res)
  }).listen(SERVE_PORT);

  console.log('Listening on :8080');
});
