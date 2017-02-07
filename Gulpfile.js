var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');
// var watchify = require('watchify');
// var buffer = require('vinyl-buffer');
// var gpuglify = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');
// var sass = require('gulp-sass');
// var rename = require('gulp-rename');
// var uglifycss = require('gulp-uglifycss');

gulp.task('serve', serve);

function serve() {
  nodemon({script: 'server/server.js'});
}

gulp.task('build', function() {
  browserify({
    entries: './app/core/Main.jsx',
    debug: true,
  })
  .transform(babelify)
  .bundle()
    // .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    // .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(gpuglify())
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'));
});

// gulps default task is to call the serve task
gulp.task('default', ['serve', 'build']);

// gulp.watch(['client/index.js', 'client/style.css'], function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });