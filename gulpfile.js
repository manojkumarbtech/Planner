var
    gulp = require('gulp'),    
    concat = require('gulp-concat'),
    cssMinify = require('gulp-cssmin'),
    durandal = require('gulp-durandal')
;

gulp.task('css', function () {
    var styles = [
        "lib/bootstrap/css/bootstrap.min.css",
        "lib/font-awesome/css/font-awesome.min.css",
        "lib/durandal/css/durandal.css",
        "lib/fullcalendar/css/fullcalendar.min.css",
        "lib/kendo-ui/css/kendo.common.core.min.css",
        "lib/kendo-ui/css/kendo.bootstrap.min.css",
        "css/main.css"
    ];
    gulp
        .src(styles)
        .pipe(concat("all.css"))
        .pipe(cssMinify())
        .pipe(gulp.dest('build/css'))

    gulp.src("lib/font-awesome/fonts/*.*")
        .pipe(gulp.dest("build/fonts"));

});

gulp.task('durandal', ['css'], function () {

    gulp
        .src('index.html')
        .pipe(gulp.dest('build'))

    gulp
        .src('img/*.*')
        .pipe(gulp.dest('build/img'))

    return durandal({
        baseDir: 'app',  
        main: 'main.js',  
        output: 'main.js',
        almond: true,
        minify: false
    }).pipe(gulp.dest('build/app'));

});

gulp.task("default", ["durandal"]);