const gulp = require('gulp');

module.exports = () => {
  gulp.task('start:dev', ['connect', 'watch']);
  gulp.task('build:dev', [
    'build:html-dev',
    'build:js-vendor-dev',
    'build:js-dev',
    'build:css-vendor-dev',
    'build:scss-dev',
    'build-img:dev',
    'build-svg:dev'
  ]);
  gulp.task('build:prod', [
    'build:html-prod',
    'build:js-vendor-prod',
    'build:js-prod',
    'build:css-vendor-prod',
    'build:scss-prod',
    'build-img:prod',
    'build-svg:prod'
  ]);
};