const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber'); 		//例外處理 避免watch 發生例外直接停止
const imagemin = require('gulp-imagemin');
const { pass } = require('./commonJoinPoint.js');


module.exports = (options) => {
  const { imgOptions, imgOptions: { imageminOptions }, svgOptions } = options;
  const imageMin = () => (imagemin({ ...imageminOptions }));

  const buildImgAround = (imageMin) => {
    return (src, dest) => {
      gulp.src(src)
        .pipe(gulpPlumber())
        .pipe(imageMin())
        .pipe(gulp.dest(dest));
    }
  };

  const buildDevImg = buildImgAround(imageMin);
  const buildProdImg = buildImgAround(imageMin);

  const buildDevSvg = buildImgAround(pass);
  const buildProdSvg = buildImgAround(pass);

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

  gulp.task('build-img:dev', () => {
    commonBuildDev(buildDevImg)(imgOptions);
  });

  gulp.task('build-img:prod', () => {
    commonBuildProd(buildProdImg)(imgOptions);
  });

  gulp.task('build-svg:dev', () => {
    commonBuildDev(buildDevSvg)(svgOptions);
  });

  gulp.task('build-svg:prod', () => {
    commonBuildProd(buildProdSvg)(svgOptions);
  });
};