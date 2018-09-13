const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('babel', function() {
    // node source
    gulp.src("server/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
    // browser source
    gulp.src("src/js/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("src/dist"));
});