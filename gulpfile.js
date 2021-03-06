var gulp = require("gulp");
var del = require('del');
var flatten = require('gulp-flatten');
var supportedfonts = [
    'node_modules/**/fonts/*.woff',
    'node_modules/**/fonts/*.woff2',
    'node_modules/**/fonts/*.eot',
    'node_modules/**/fonts/*.svg',
    'node_modules/**/fonts/*.ttf',
    'node_modules/**/fonts/*.otf',
    'node_modules/**/webfonts/*.woff',
    'node_modules/**/webfonts/*.woff2',
    'node_modules/**/webfonts/*.eot',
    'node_modules/**/webfonts/*.svg',
    'node_modules/**/webfonts/*.ttf',
    'node_modules/**/webfonts/*.otf'
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

