const autoprefixer    = require('autoprefixer'),
      concat          = require('gulp-concat-util'),
      cssnano         = require('cssnano'),
      gulp            = require('gulp'),
      plumber         = require('gulp-plumber'),
      postcss         = require('gulp-postcss'),
      rename          = require('gulp-rename'),
      sass            = require('gulp-sass');

// Critical CSS
gulp.task('critical', () => {
  const plugins = [autoprefixer({browsers: ['> 5%']}), cssnano()];
  return (
    gulp.src('assets/css/critical.scss')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(plugins))
      // wrap with style tags
      .pipe(concat.header('<style>'))
      .pipe(concat.footer('</style>'))
      // convert it to an include file
      .pipe(
        rename({
          basename: 'critical',
          extname: '.html',
        })
      )
      // insert file
      .pipe(gulp.dest('layouts/partials'))
  );
});

// Watch asset folder for changes
gulp.task('watch', gulp.series(['critical'], () => {
  gulp.watch('assets/css/colors.scss', gulp.parallel(['critical']));
  gulp.watch('assets/css/critical.scss', gulp.parallel(['critical']));
  gulp.watch('assets/css/extends.scss', gulp.parallel(['critical']));
  gulp.watch('assets/css/fonts.scss', gulp.parallel(['critical']));
  gulp.watch('assets/css/mixins.scss', gulp.parallel(['critical']));
  gulp.watch('assets/css/reset.scss', gulp.parallel(['critical']));
}));

// Run Watch as default
gulp.task('default', gulp.series(['watch']));

// Build
gulp.task('build', gulp.series(['critical']));