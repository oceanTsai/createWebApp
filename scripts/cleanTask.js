const gulp = require('gulp');
const del = require('del');

module.exports = (options) => {
  const { jsOptions, vendorJsOptions, cssOptions, imageOptions, htmlOptions, allOptions } = options;
  
  const cleanResourceDev = ({ delPath }, then) => {
    const thenHandl = then ? then : (paths) => { };
    del(delPath.dev).then(thenHandl);
  }

  const cleanResourceProd = ({ delPath }, then) => {
    const thenHandl = then ? then : (paths) => { };
    del(delPath.prod).then(thenHandl);
  }

  gulp.task('clean:css-dev', () => {
    cleanResourceDev(cssOptions);
  });

  gulp.task('clean:css-prod', () => {
    cleanResourceProd(cssOptions);
  });

  gulp.task('clean:js-dev', () => {
    cleanResourceDev(jsOptions);
  });

  gulp.task('clean:js-prod', () => {
    cleanResourceProd(jsOptions);
  });

  gulp.task('clean:js-vendor-dev', () => {
    cleanResourceDev(vendorJsOptions);
  });

  gulp.task('clean:js-vendor-prod', () => {
    cleanResourceProd(vendorJsOptions);
  });

  gulp.task('clean:img-dev', () => {
    cleanResourceDev(imageOptions);
  });

  gulp.task('clean:img-prod', () => {
    cleanResourceProd(imageOptions);
  });

  gulp.task('clean:html-dev', () => {
    cleanResourceDev(htmlOptions);
  });

  gulp.task('clean:html-prod', () => {
    cleanResourceProd(htmlOptions);
  });

  gulp.task('clean:all-dev', () => {
    cleanResourceDev(allOptions);
  });

  gulp.task('clean:all-prod', () => {
    cleanResourceProd(allOptions);
  });
};