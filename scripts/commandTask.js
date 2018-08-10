const gulp = require('gulp');

module.exports = () => {
  gulp.task('start:dev', ['connect', 'watch']);
  gulp.task('build:dev', [
    'build:html',
    'build:js-vendor',
    'build:js-dev',
    'build:css-vendor',
    'build:scss-dev',
    'build-img:dev',
    'build-svg:dev'
  ]);
  gulp.task('build:prod', [
    'build:html',
    'build:js-vendor',
    'build:js-prod',
    'build:css-vendor',
    'build:scss-prod',
    'build-img:prod',
    'build-svg:prod'
  ]);
};