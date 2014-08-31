var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var rename = require("gulp-rename");
var beep = require('beepbeep');
var source = require('vinyl-source-stream');

gulp.task('default',['watch-test'], function() {
  // place code for your default task here
});

gulp.task('test', function(){
  return gulp.src(['test/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', function(err){
          beep(2);
          this.emit('end');
        });
});

gulp.task('watch-test', function(){
  gulp.watch(['lib/**', 'test/**', 'index.js'], ['test']);
});

gulp.task('lint', function(){
  return gulp.src(['./lib/*.js','./index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
    return browserify('./index.js')
        .bundle()
        .pipe(source('runnr-workout.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/client/'));
});
