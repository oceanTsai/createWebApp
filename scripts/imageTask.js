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

  const commonBuild = (build) => {
    return (options) => {
      const { srcPath, destPath } = options;
      build(srcPath, destPath);
    }
  };

  gulp.task('build-img:dev', () => {
    commonBuild(buildDevImg)(imgOptions);
  });

  gulp.task('build-img:prod', () => {
    commonBuild(buildProdImg)(imgOptions);
  });

  gulp.task('build-svg:dev', () => {
    commonBuild(buildDevSvg)(svgOptions);
  });

  gulp.task('build-svg:prod', () => {
    commonBuild(buildProdSvg)(svgOptions);
  });
};