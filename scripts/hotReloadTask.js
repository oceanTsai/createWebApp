const gulp = require('gulp');
const { httpServer, connect, proxy } = require('./commonJoinPoint.js');

module.exports = (options) => {
  const { serverOptions, proxyOptions={}, hotReloadOptions: { jsWatch, scssWatch, htmlWatch } } = options;

  gulp.task('connect', () => {
    
    const proxyConfig = proxyOptions 
      ? Object.keys(proxyOptions).map((proxyKey)=>(
          proxy([proxyKey], proxyOptions[proxyKey])
        ))
      : []
    const httpServerConfig = {
      ...serverOptions,
      middleware: (connect, opt) => (proxyConfig)
    };
    httpServer(httpServerConfig);
  });

  gulp.task('stop', () => {
    connect.serverClose();
  });

  gulp.task('watch', () => {
    gulp.watch(htmlWatch, ['watch:html']);
    gulp.watch(jsWatch, ['watch:js']);
    gulp.watch(scssWatch, ['watch:scss']);
  });
};