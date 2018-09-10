const gulp = require('gulp');
const browserify = require('browserify');           //package js
const source = require('vinyl-source-stream');      //
const buffer = require('vinyl-buffer');             //
const gulpUglify = require('gulp-uglify');          //醜化
const gulpes3ify = require("gulp-es3ify");          //為了ie8 無法使用 export default
const { pass } = require('./commonJoinPoint.js');   //

module.exports = (options) => {
  const { uglifyOptions, vendors, distName } = options;

  const uglify = () => (gulpUglify(uglifyOptions));

  const buildJsAround = (uglify, es3ify) => {
    return (destPath) => {
      browserify({ debug: true, require: vendors })
        .transform('babelify')
        .bundle()
        .pipe(source(distName || 'vendors.js'))
        .pipe(buffer())
        .pipe(es3ify()) //ie8
        .pipe(uglify())
        .pipe(gulp.dest(destPath));
    }
  };

  const buildVendorJs = buildJsAround(uglify, pass);
  const buildVendorJsIe8 = buildJsAround(uglify, gulpes3ify);

  gulp.task('build:js-vendor-dev', () => {
    const { destPath } = options;
    buildVendorJs(destPath.dev);
  });

  gulp.task('build:js-vendor-prod', () => {
    const { destPath } = options;
    buildVendorJs(destPath.prod);
  });

  gulp.task('build:js-vendor-ie8-dev', () => {
    const { destPath } = options;
    buildVendorJsIe8(destPath.dev);
  });

  gulp.task('build:js-vendor-ie8-prod', () => {
    const { destPath } = options;
    buildVendorJsIe8(destPath.prod);
  });

};