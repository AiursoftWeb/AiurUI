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

var packages = [
    // AiurCore - CSS
    {
        inputFiles: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/nprogress/nprogress.css',
            'css/AiurCore.css'
        ],
        iscss: true,
        outputFileName: 'AiurCore.min.css'
    },
    // AiurMarket - CSS
    {
        inputFiles: [
            'css/AiurMarket.css'
        ],
        iscss: true,
        outputFileName: 'AiurMarket.min.css'
    },
    // AiurProduct - CSS
    {
        inputFiles: [
            'node_modules/primer/build/build.css',
            'css/AiurProduct.css'
        ],
        iscss: true,
        outputFileName: 'AiurProduct.min.css'
    },
    // AiurDashboard - CSS
    {
        inputFiles: [
            'node_modules/datatables/media/css/jquery.dataTables.css',
            'node_modules/primer-markdown/build/build.css',
            'node_modules/github-syntax-light/lib/github-light.css',
            'css/AiurDashboard.css'
        ],
        iscss: true,
        outputFileName: 'AiurDashboard.min.css'
    }
]

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

gulp.task('css', function (done) {
    packages.filter(t => t.iscss).forEach(function (package) {
        gulp.src(package.inputFiles)
            .pipe(expect(package.inputFiles))
            .pipe(concat('temp'))
            .pipe(cleancss())
            .pipe(rename(package.outputFileName))
            .pipe(gulp.dest('dist'));
    });
    done();
});

gulp.task('bundle', gulp.series('clean', 'copy-fonts', 'css'));

