var gulp = require('gulp');
var jscs = require('gulp-jscs');

gulp.task('jscs', function () {
  'use strict';
  return gulp.src([
          'index.js',
          'gulpfile.js',
      ])
      .pipe(jscs())
      .pipe(jscs.reporter())
      .pipe(jscs.reporter('fail'));
});

gulp.task('default', ['jscs'], function () {});
