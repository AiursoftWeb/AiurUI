var gulp = require("gulp");
var del = require('del');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var expect = require('gulp-expect-file');
var supportedfonts = [
    'node_modules/**/fonts/*.woff',
    'node_modules/**/fonts/*.woff2',
    'node_modules/**/fonts/*.eot',
    'node_modules/**/fonts/*.svg',
    'node_modules/**/fonts/*.ttf',
    'node_modules/**/fonts/*.otf'
];


gulp.task('clean', function (done) {
    del('dist/**/*');
    del('fonts/**/*');
    done();
});

gulp.task('copy-fonts', function () {
    return gulp.src(supportedfonts)
        .pipe(flatten())
        .pipe(gulp.dest('fonts'));
})

gulp.task('bundle', gulp.series('clean', 'copy-fonts'));

