var gulp = require('gulp');// khai bao ra de su dung gupl
var sass = require('gulp-sass');// chuyen file sass sang css
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();// tao ra 1 casi webserver de tu dong reload lai trang lkhi luwu

// task sau se bien dịch sass thành css
gulp.task('sass', function(){
	return gulp.src('assets/scss/**/*.scss')// goi duong linh can chuyen
	.pipe(sass()) // (cai ten nay khai bao trong var)dua cai file do qua cai sass nay no se bien dich cho minh
	.pipe(gulp.dest('assets/css')) // day la cai file dau ra
	.pipe(browserSync.reload({
		stream: true
		}))
	});
// theo doi su thay doi cua file sass giup tu dong chay sass khi luwwu 1 file .scss
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('assets/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('assets/*.html', browserSync.reload); 
  gulp.watch('assets/js/**/*.js', browserSync.reload); 
});
//tao ra 1 cais webserver de tai lai trang tu dong ma cai nay khong phai plugin cua gulp
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'assets'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('assets/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.assets', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('assets/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence('watch',
    callback
  )
})