const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber');
const path = require("path");

module.exports = () => {
  const clonePath = path.resolve(__dirname,'../'); //
  gulp.task('create:f2eApp', ()=>{
    gulp.src(
      [
        `${clonePath}/config/**/*`, 
        `${clonePath}/src/**/*`,
        `${clonePath}/.babelrc`
      ],
      {base: clonePath})
        .pipe(gulpPlumber())
        .pipe(gulp.dest(`${process.cwd()}`))
  });
};