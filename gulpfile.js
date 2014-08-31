var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    beep = require('beepbeep');

gulp.task('default',['watch-test']);

gulp.task('test', function(){
  return gulp.src(['test/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', function(err){
          beep(2);
          gutil.log(err);
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

gulp.task('clean', function () {
  return gulp.src('./build/**/*.*', { read: false })
    .pipe(rimraf());
});
