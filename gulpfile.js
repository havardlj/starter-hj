/*

A quick note regarding environments:

1) Set (mode.prod()) or (mode.dev()) before tasks if that task is only needed for that environment
2) Run gulp --prod before deployment to prod

*/

var gulp = require('gulp'),
    browsersync = require('browser-sync').create();
    errorHandler = require('gulp-error-handle'),
    cleancss = require('gulp-clean-css'),
    mode = require('gulp-mode')({
      modes: ['prod','dev'],
      default: 'dev'
    }),
    pkg = require('./package.json'),
    replace = require('gulp-replace'),
    rename = require("gulp-rename"),
    purgecss = require('@fullhuman/postcss-purgecss'),
    postcss = require('gulp-postcss'),
    postcssfor = require('postcss-for'),
    postcsseach = require('postcss-each'),
    postcssimport = require('postcss-easy-import'),
    postcssNesting = require('postcss-nested'),
    tailwindcss = require('tailwindcss'),
    webpack = require('webpack'),
    webpackconfig = require('./webpack.config.js'),
    webpackstream = require('webpack-stream');


/* Browsersync */
function browserSync(done) {
  browsersync.init({
    proxy: pkg.paths.siteUrl.dev,
    port: 8080,
    open: true,
    notify: false
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}


/* Building files */
function css(done) {
  gulp
    .src(pkg.paths.src.css + 'index.css')
    .pipe(errorHandler())
    .pipe(postcss([
      postcssimport(),
      postcssfor(),
      postcsseach(),
      tailwindcss('tailwind.js'),
      postcssNesting(),
      purgecss({
        content: [pkg.paths.templates + '**/*.*'],
        defaultExtractor: content =>
          content.match(/[\w-/:]+(?<!:)/g) || []
      }),
      require('autoprefixer')
    ]))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(pkg.paths.dest.css))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(pkg.paths.dest.css))
  if(mode.prod()) {
    assetBust();
  }
  //browserSyncReload(done);
  done();
}

function js(done) {
  gulp
    .src([pkg.paths.src.js + '/**/*'])
    .pipe(errorHandler())
    .pipe(webpackstream(webpackconfig, webpack))
    .pipe(gulp.dest(pkg.paths.dest.js));
  //browserSyncReload(done);
  done();
}


/* Static assets versioning */
function assetBust(done){
  gulp.src(pkg.paths.craft.config + '/general.php')
  .pipe(replace(/'staticAssetsVersion' => (\d+),/g, function(match, p1, offset, string) {
    p1++;
    return "'staticAssetsVersion' => " + p1 + ",";
  }))
  .pipe(rename('general1.php'))
  .pipe(gulp.dest(pkg.paths.craft.config));
  done();
}

/* Watch */
function watchFiles(done) {
  gulp.watch('tailwind.js', css);
  gulp.watch(pkg.paths.templates + '**/*.*', css);
  gulp.watch(pkg.paths.src.css + '**/*', css);
  gulp.watch(pkg.paths.src.js + '**/*', js);
  done();
}

/* Tasks */
gulp.task('css', css);
gulp.task('js', js);

/* The task. Run gulp watch from CLI */
gulp.task('dev', gulp.parallel(watchFiles, assetBust)); //, browserSync));
gulp.task('build', gulp.parallel(css, assetBust));