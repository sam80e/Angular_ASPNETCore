var gulp = require('gulp'),
    del = require('del'),
    libPath = 'wwwroot/lib',
    tsSource = 'wwwroot/app',
    nodeModulesPath = 'node_modules';
    ts = require('gulp-typescript');
gulp.task('clean', function () {
    return del(libPath + '/**/*', { force: true });
});

gulp.task('copy:libs', function (done) {
    gulp.series('clean', 'copy:vendor', 'copy:rxjs', 'copy:angular', done);
});

gulp.task('copy:vendor', function () {
    return gulp.src([
        nodeModulesPath + '/core-js/client/**/*',
        nodeModulesPath + '/zone.js/dist/zone.js',
        nodeModulesPath + '/systemjs/dist/system-polyfills.js',
        nodeModulesPath + '/systemjs/dist/system.src.js',
        nodeModulesPath + '/tslib/tslib.js'
    ])
        .pipe(gulp.dest(libPath));
});

gulp.task('copy:rxjs', function () {
    return gulp.src([
        nodeModulesPath + '/rxjs/**/*'
    ])
        .pipe(gulp.dest(libPath + '/rxjs'));
});

gulp.task('copy:angular', function () {
    //   return gulp.src([
    //       'node_modules/@angular/common/bundles/common.umd.js',
    //       'node_modules/@angular/compiler/bundles/compiler.umd.js',
    //       'node_modules/@angular/core/bundles/core.umd.js',
    //       'node_modules/@angular/forms/bundles/forms.umd.js',
    //       'node_modules/@angular/http/bundles/http.umd.js',      
    //       'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    //       'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    //       'node_modules/@angular/router/bundles/router.umd.js',
    //     ])
    return gulp.src([nodeModulesPath + '/@angular/**/*']).pipe(gulp.dest(libPath + '/@angular'));
});

var tsProject;
gulp.task("compileTs", function () {
    var ts = require("gulp-typescript");
    var sourcemaps = require('gulp-sourcemaps');

    if (!tsProject) {
        tsProject = ts.createProject("tsconfig.json");
    }

    var reporter = ts.reporter.fullReporter();
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(reporter));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("."));
});

gulp.task('watch', function () {

});

gulp.task('default', gulp.series('watch'));