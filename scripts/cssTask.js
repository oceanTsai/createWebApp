const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber'); 	  	            //例外處理
const gulpSass = require('gulp-sass'); 					              //builder sass to css
const gulpCleanCSS = require('gulp-clean-css'); 		          // minify css
const gulpAutoprefixer = require('gulp-autoprefixer');        //
const { pass, reload } = require('./commonJoinPoint.js');    //

module.exports = (options) => {
  const { autoprefixerOption, cleanCssOptions } = options;
  console.log(options)
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

  const commonBuildProd = (build) => {
    return (options) => {
      const { srcPath, destPath } = options;
      build(srcPath, destPath.prod);
    }
  };

  const commonBuildDev = (build) => {
    return (options) => {
      const { srcPath, destPath } = options;
      build(srcPath, destPath.dev);
    }
  };

  gulp.task('build:scss-dev', () => {
    
    commonBuildDev(buildDevScss)(options);
  });

  gulp.task('build:scss-prod', () => {
    commonBuildProd(buildProdScss)(options);
  });

  gulp.task('watch:scss', () => {
    commonBuildDev(buildWatchScss)(options);
  });
};