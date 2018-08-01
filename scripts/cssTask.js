const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber'); 	  	            //例外處理
const gulpSass = require('gulp-sass'); 					              //builder sass to css
const gulpCleanCSS = require('gulp-clean-css'); 		          // minify css
const gulpAutoprefixer = require('gulp-autoprefixer');        //
const { pass, reload } = require('./commonJoinPoint.js');    //

module.exports = (options) => {
  const { autoprefixerOption, cleanCssOptions } = options;
  const autoprefixer = () => (gulpAutoprefixer({ ...autoprefixerOption }));
  const cleanCss = () => (gulpCleanCSS({ ...cleanCssOptions }));

  const buildScss = ({ autoprefixer = pass, cleanCss = pass, reload = pass }) => ((src, dest) => (
    gulp.src(src)
      .pipe(gulpPlumber())
      .pipe(gulpSass())
      .pipe(autoprefixer())
      .pipe(cleanCss())
      .pipe(gulp.dest(dest))
      .pipe(reload())
  ));

  const buildDevScss = buildScss({ autoprefixer });
  const buildProdScss = buildScss({ autoprefixer, cleanCss });
  const buildWatchScss = buildScss({ reload });

  const commonBuild = (build) => ((options) => {
    const { srcPath, destPath } = options;
    build(srcPath, destPath);
  });

  gulp.task('build:scss-dev', () => {
    commonBuild(buildDevScss)(options);
  });

  gulp.task('build:scss-prod', () => {
    commonBuild(buildProdScss)(options);
  });

  gulp.task('watch:scss', () => {
    commonBuild(buildWatchScss)(options);
  });
};