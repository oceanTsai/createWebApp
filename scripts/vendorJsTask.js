const gulp = require('gulp');
const browserify = require('browserify');           //package js
const source = require('vinyl-source-stream');      //
const buffer = require('vinyl-buffer');             //
const gulpUglify = require('gulp-uglify');          //醜化
const gulpes3ify = require("gulp-es3ify");          //為了ie8 無法使用 export default
const { pass } = require('./commonJoinPoint.js');   //

module.exports = (options) => {

  const buildJsAround = (uglify, es3ify) => {
    return (vendors, distName, destPath) => {
      if (vendors, distName, destPath) {
        browserify({ debug: true, require: vendors })
          .transform('babelify')
          .bundle()
          .pipe(source(distName))
          .pipe(buffer())
          .pipe(es3ify()) //ie8
          .pipe(uglify())
          .pipe(gulp.dest(destPath));
      }
    }
  };

  gulp.task('build:js-vendor-dev', () => {
    options && options.forEach(({ uglifyOptions, vendors, distName, destPath }) => {
      const uglify = () => (gulpUglify(uglifyOptions));
      const buildVendorJs = buildJsAround(uglify, pass);
      buildVendorJs(vendors, distName, destPath.dev);
    });
  });

  gulp.task('build:js-vendor-prod', () => {
    options && options.forEach(({ uglifyOptions, vendors, distName, destPath }) => {
      const uglify = () => (gulpUglify(uglifyOptions));
      const buildVendorJs = buildJsAround(uglify, pass);
      buildVendorJs(vendors, distName, destPath.prod);
    });
  });

  gulp.task('build:js-vendor-ie8-dev', () => {
    options && options.forEach(({ uglifyOptions, vendors, distName, destPath }) => {
      const uglify = () => (gulpUglify(uglifyOptions));
      const buildVendorJsIe8 = buildJsAround(uglify, gulpes3ify);
      buildVendorJsIe8(vendors, distName, destPath.dev);
    });
  });

  gulp.task('build:js-vendor-ie8-prod', () => {
    options && options.forEach(({ uglifyOptions, vendors, distName, destPath }) => {
      const uglify = () => (gulpUglify(uglifyOptions));
      const buildVendorJsIe8 = buildJsAround(uglify, gulpes3ify);
      buildVendorJsIe8(vendors, distName, destPath.prod);
    });
  });
};