var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

var css_files = [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'app/assets/css/*.css'
    ],
    js_files = [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    font_files = ['bower_components/bootstrap/dist/fonts/*'];

gulp.task('styles', function() {
    gulp.src(css_files)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('fonts', function(){
    gulp.src(font_files)
        .pipe(gulp.dest('public/assets/fonts'));
});

gulp.task('scripts', function() {
    gulp.src(js_files)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/assets/js'))
});

gulp.task('html', function(){
    gulp.src('index.html')
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('index.html', ['html']);
});

gulp.task('server', function(){
    browserSync.init({
        server: {
        baseDir: 'public'
      }
    });

    gulp.watch('app/index.html', ['html']).on('change', browserSync.reload);
    gulp.watch(css_files, ['styles']).on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'fonts', 'html', 'scripts']);
gulp.task('serve', ['default', 'server']);
