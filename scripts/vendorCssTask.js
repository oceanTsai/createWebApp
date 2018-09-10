const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber'); 	  	          //例外處理
const concatCss = require('gulp-concat-css');               //合併CSS
const gulpCleanCSS = require('gulp-clean-css'); 		        // minify css
const gulpAutoprefixer = require('gulp-autoprefixer');      //
const { pass } = require('./commonJoinPoint.js');           //

module.exports = (options) => {
  const { autoprefixerOption, cleanCssOptions, distName } = options;
  const autoprefixer = () => (gulpAutoprefixer({ ...autoprefixerOption }));
  const cleanCss = () => (gulpCleanCSS({ ...cleanCssOptions }));

  const buildCss = ({ autoprefixer = pass, cleanCss = pass }) => ((src, dest) => (
    gulp.src(src)
      .pipe(gulpPlumber())
      .pipe(concatCss(distName))
      .pipe(autoprefixer())
      .pipe(cleanCss())
      .pipe(gulp.dest(dest))
  ));

  const builVendorCss = buildCss({ cleanCss });

  gulp.task('build:css-vendor-dev', () => {
    const { vendors, manualVendors, destPath } = options;
    const srcList = [...vendors.map(moduleName => (require.resolve(moduleName))), ...manualVendors];
    builVendorCss(srcList, destPath.dev);
  });

  gulp.task('build:css-vendor-prod', () => {
    const { vendors, manualVendors, destPath } = options;
    const srcList = [...vendors.map(moduleName => (require.resolve(moduleName))), ...manualVendors];
    builVendorCss(srcList, destPath.prod);
  });

};