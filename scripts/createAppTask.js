const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');    //例外處理 避免watch 發生例外直接停止
//const rename = require("gulp-rename");          //

module.exports = () => {
  gulp.task('create:f2eApp', () => {
    gulp.src([
      './config/**/*', 
      './src/**/*',
      './.babelrc'
    ], {base: '.'})
        .pipe(gulpPlumber())
        .pipe(gulp.dest('./f2eApp'))
  });
};