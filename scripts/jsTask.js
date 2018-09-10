const gulp = require('gulp');
const path = require('path');
const glob = require('glob');                     //
const browserify = require('browserify');         //package js
const source = require('vinyl-source-stream');    //
const buffer = require('vinyl-buffer');           //
const gulpUglify = require('gulp-uglify');        //
const es3ify = require("gulp-es3ify");            //ie8 keyword.
const sourcemaps = require('gulp-sourcemaps'); 	  //create js source map
const watchify = require('watchify');						  //browserify package speed
const { pass, reload } = require('./commonJoinPoint.js');
const WATCHIFY = { 'ENABLE': true, 'DISABLE': false };

module.exports = (options) => {
  const {
    jsOptions: { uglifyOptions, mapPath, srcPath, destPath, vendors }
  } = options;

  const uglify = () => (gulpUglify(uglifyOptions));
  const sourceMapInit = () => (sourcemaps.init({ loadMaps: true }));
  const sourceMapWrite = () => (sourcemaps.write(mapPath))

  const buildJsAround = ({ uglify = pass, reload = pass, sourceMapInit = pass, sourceMapWrite = pass, es3ify = pass }) => {
    const bundle = function (file) {
      this.bundle()
        .on('error', function (err) {
          console.log(err.message);
          console.log(err);
          this.emit('end');
        })
        .pipe(source(path.basename(file)))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourceMapInit())
        .pipe(sourceMapWrite())
        .pipe(es3ify())
        .pipe(gulp.dest(destPath))
        .pipe(reload())
    };

    return (isWatchify) => {
      glob(srcPath, {}, function (err, files) {
        files.forEach(function (file) {
          //TODO watchify
          const browserifyOption = { entries: [file] };
          //const browserifyOption = isWatchify ? { entries: [file], plugin: [watchify] } : { entries: [file] } ;
          let browserifyInstance =
            browserify(browserifyOption)
              .external(vendors)            //排除 vendors (vendors項目不轉譯)
              .transform('babelify');       //支援 es6 import export
          //開發階段，只打包有異動的部分，以便於增加開發速度
          if (isWatchify) {
            //browserifyInstance.on('update', bundle.bind(browserifyInstance, file))
            bundle.call(browserifyInstance, file);
          } else {
            bundle.call(browserifyInstance, file);
          }
        });
      });
    }
  };

  gulp.task('build:js-dev', () => {
    buildJsAround({ sourceMapInit, sourceMapWrite })(WATCHIFY.DISABLE); //pass, pass, sourceMapInit, sourceMapWrite
  });

  gulp.task('build:js-prod', () => {
    buildJsAround({ uglify, sourceMapInit, sourceMapWrite })(WATCHIFY.DISABLE);
  });

  gulp.task('watch:js', () => {
    buildJsAround({ reload })(WATCHIFY.ENABLE);
  });
};