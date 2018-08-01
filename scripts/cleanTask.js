const gulp = require('gulp');
const del = require('del');

module.exports = (options) => {
  const { jsOptions, vendorJsOptions, cssOptions, imageOptions, htmlOptions, allOptions } = options;
  const cleanResource = ({ delPath }, then) => {
    const thenHandl = then ? then : (paths) => { };
    del(delPath).then(thenHandl);
  }

  gulp.task('clean:css', () => {
    cleanResource(cssOptions);
  });

  gulp.task('clean:js', () => {
    cleanResource(jsOptions);
  });

  gulp.task('clean:js-vendor', () => {
    cleanResource(vendorJsOptions);
  });

  gulp.task('clean:img', () => {
    cleanResource(imageOptions);
  });

  gulp.task('clean:html', () => {
    cleanResource(htmlOptions);
  });

  gulp.task('clean:all', () => {
    cleanResource(allOptions);
  });
};