const gulp = require('gulp');
const browserify = require('browserify');           //package js
const source = require('vinyl-source-stream');      //
const buffer = require('vinyl-buffer');             //
const gulpUglify = require('gulp-uglify');          //醜化
const gulpes3ify = require("gulp-es3ify");          //為了ie8 無法使用 export default
const { pass } = require('./commonJoinPoint.js');   //

module.exports = (options) => {
  const { uglifyOptions, vendors, destPath, distName } = options;
  
  const uglify = () => (gulpUglify(uglifyOptions));

  const buildJsAround = (uglify, es3ify) => {
    return () => {
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

  gulp.task('build:js-vendor', () => {
    buildVendorJs();
  });

  gulp.task('build:js-vendor-ie8', () => {
    buildVendorJsIe8();
  });

};