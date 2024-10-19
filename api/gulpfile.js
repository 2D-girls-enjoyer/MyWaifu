const gulp = require('gulp');
const terser = require('gulp-terser');

const terserConfig = require('./terser.config.json'); // Load Terser config
// Gulp task to minify JavaScript files in the dist directory
gulp.task('minify-js', function () {
  return gulp.src('dist/**/*.js')
    .pipe(terser(terserConfig))
    .pipe(gulp.dest('dist'));
});
