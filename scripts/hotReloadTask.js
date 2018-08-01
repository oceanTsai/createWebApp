const gulp = require('gulp');
const { httpServer } = require('./commonJoinPoint.js');

module.exports = (options) => {
  const { serverOptions, hotReloadOptions: { jsWatch, scssWatch, htmlWatch } } = options;

  gulp.task('connect', () => {
    httpServer(serverOptions);
  });

  gulp.task('watch', () => {
    gulp.watch(htmlWatch, ['watch:html']);
    gulp.watch(jsWatch, ['watch:js']);
    gulp.watch(scssWatch, ['watch:scss']);
  });
};