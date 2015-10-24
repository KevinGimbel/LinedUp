/*
 * Loading the modules we neeed.
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

var path = {
  src: {
    sass: './src/scss',
    js: './src/js'
  },
  dest: {
    css: './public/css',
    js: './public/js'
  }
}


gulp.task('uglify', function() {
    gulp.src(path.src.js + '/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.dest.js));
});

gulp.task('sass', function() {
    gulp.src(path.src.sass + '/style.scss')
        .pipe(prefix())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(path.dest.css));
});

gulp.task('watch', function() {
  gulp.watch(path.src.sass + '/**/*.scss', ['sass']);
  gulp.watch(path.src.js + '/**/*.js', ['uglify']);
});

gulp.task('default', ['watch', 'sass', 'uglify']);
