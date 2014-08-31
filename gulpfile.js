var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    browserify = require('browserify'),
    beep = require('beepbeep'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer');

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

gulp.task('build', function() {
    return browserify('./index.js')
        .bundle()
        .pipe(source('runnr-workout.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./build/client/'));
});
