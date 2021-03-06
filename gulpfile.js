'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./styles/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./styles/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);
gulp.task('watch', ['sass:watch']);
