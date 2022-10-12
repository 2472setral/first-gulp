
const {src, dest, watch, parallel, series } = require('gulp');

const scss = require ('gulp-sass')(require('sass'));
const concat = require ('gulp-concat')
const autoprefixer = require ('gulp-autoprefixer')
const uglify = require ('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require ('browser-sync').create();
const del = require ('del');

function browsersync () {
    browserSync.init({
        server:{
            baseDir: 'app/'
        },
        notofy: false
    })
}

function styles() {
return src ('app/scss/style.scss')
.pipe(scss({outputStyle: 'compressed'}))
.pipe(concat('style.min.css'))
.pipe(autoprefixer({overideBrowserslist: ['last 10 versions']}))
.pipe(dest('app/css'))
.pipe(browserSync.stream())
}

function script(){
 return src (['app/js/main.js',
//  'node_modules/jquery/dist/jquery.js'
])

 .pipe(concat('main.min.js'))
 .pipe(uglify())
 .pipe(dest('app/js'))
 .pipe(browserSync.stream())
}

function images() {
    return src ('app/images/**/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
         plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
         ]
        })
       ]
    ))
    .pipe(dest('dist/images'))
}


function watching() {
 watch(['app/scss/**/*.scss'],styles);
 watch(['app/js/**/*.js','!app/js/main.min.js' ], script);
 watch(['app/**/*.html']).on('change', browserSync.reload)
}

function build() {
    return src([
    'app/**/*.html',
    'app/js/main.min.js',
    'app/css/style.min.css'
    ], {base:'app'})
    .pipe(dest('dist'))
}

function clearDist() {
    return del('dist')
}


exports.styles = styles;
exports.script = script;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.clearDist = clearDist;

exports.default = parallel(styles,script,browsersync,watching);

exports.build = series(clearDist,images,build);