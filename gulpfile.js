var gulp         = require('gulp'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat-util'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    sass         = require('gulp-sass');

// Critical CSS
gulp.task('critical-main', function() {
  var plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ];
  return gulp.src('assets/scss/critical-main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  // wrap with style tags
  .pipe(concat.header('<style>'))
  .pipe(concat.footer('</style>'))
  // convert it to an include file
  .pipe(rename({
      basename: 'critical-main',
      extname: '.html'
    }))
  // insert file
  .pipe(gulp.dest('layouts/partials'));
});
gulp.task('critical-home', function() {
  var plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ];
  return gulp.src('assets/scss/critical-home.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  // wrap with style tags
  .pipe(concat.header('<style>'))
  .pipe(concat.footer('</style>'))
  // convert it to an include file
  .pipe(rename({
      basename: 'critical-home',
      extname: '.html'
    }))
  // insert file
  .pipe(gulp.dest('layouts/partials'));
});
gulp.task('critical-aboveTheFold', function() {
  var plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ];
  return gulp.src('assets/scss/critical-aboveTheFold.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  // wrap with style tags
  .pipe(concat.header('<style>'))
  .pipe(concat.footer('</style>'))
  // convert it to an include file
  .pipe(rename({
      basename: 'critical-aboveTheFold',
      extname: '.html'
    }))
  // insert file
  .pipe(gulp.dest('layouts/partials'));
});

// Watch asset folder for changes
gulp.task('watch', ['critical-main','critical-home','critical-aboveTheFold'], function () {
  gulp.watch('assets/scss/critical-main.scss', ['critical-main'])
  gulp.watch('assets/scss/critical-home.scss', ['critical-home'])
  gulp.watch('assets/scss/critical-aboveTheFold.scss', ['critical-aboveTheFold'])
});

// Run Watch as default
gulp.task('default', ['watch']);

// Build
gulp.task('build', ['critical-main','critical-home','critical-aboveTheFold']);