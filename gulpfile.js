var gulp         = require('gulp'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat-util'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    sass         = require('gulp-sass');

// Critical CSS
gulp.task('critical-home', function() {
  var plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ];
  return gulp.src(['assets/css/critical-main.scss', 'assets/css/critical-home.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  .pipe(concat('critical-home.html'))
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
  return gulp.src(['assets/css/critical-main.scss', 'assets/css/critical-aboveTheFold.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  .pipe(concat('critical-aboveTheFold.html'))
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
gulp.task('watch', ['critical-home','critical-aboveTheFold'], function () {
  gulp.watch('assets/css/critical-home.scss', ['critical-home'])
  gulp.watch('assets/css/critical-aboveTheFold.scss', ['critical-aboveTheFold'])
});

// Run Watch as default
gulp.task('default', ['watch']);

// Build
gulp.task('build', ['critical-home','critical-aboveTheFold']);