var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin'),
    hash         = require('gulp-hash'),
    del          = require('del');

// Compile SCSS files to CSS
gulp.task('scss', function () {
  del(['static/css/*'])
  gulp.src('src/scss/main.scss')
    .pipe(sass({outputStyle : 'compressed'}))
    .pipe(autoprefixer({browsers : ['last 20 versions']}))
    .pipe(hash())
    .pipe(gulp.dest('static/css'))
    //Create a hash map
    .pipe(hash.manifest('hash.json'))
    //Put the map in the data directory
    .pipe(gulp.dest('data/css'))
})

// Move fonts
gulp.task('type', function() {
  gulp.src('src/type/**.*')
      .pipe(gulp.dest('static/type'));
});

// Hash img
gulp.task('img', function () {
  del(['static/img/*'])
  gulp.src('src/img/*')
    .pipe(hash())
    .pipe(gulp.dest('static/img'))
    .pipe(hash.manifest('hash.json'))
    .pipe(gulp.dest('data/img'))
})

// Hash javascript
gulp.task('js', function () {
  del(['static/js/*'])
  gulp.src('src/js/*')
    .pipe(hash())
    .pipe(gulp.dest('static/js'))
    .pipe(hash.manifest('hash.json'))
    .pipe(gulp.dest('data/js'))
})

// Watch asset folder for changes
gulp.task('watch', ['scss', 'type', 'img', 'js'], function () {
  gulp.watch('src/scss/*', ['scss'])
  gulp.watch('src/type/**.*', ['type'])
  gulp.watch('src/js/*', ['js'])
  gulp.watch('src/img/*', ['img'])
});

// Run Watch as default
gulp.task('default', ['watch']);

// Build
gulp.task('build', ['scss', 'type', 'img', 'js']);