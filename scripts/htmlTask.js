const gulp = require('gulp');
const gulpPlumber = require('gulp-plumber'); 		           //例外處理 避免watch 發生例外直接停止
const ejs = require('gulp-ejs');                           //樣版引擎
const rename = require("gulp-rename");                     //
const { pass, reload } = require('./commonJoinPoint.js');  //

module.exports = (options, PATH) => {
  const buildHtml = ({ reload = pass }) => (() => {
    const {htmlOptions, layoutOptions} = options;
    const { srcPath, destPath, vendorJsName } = htmlOptions;
    Object.keys(layoutOptions).forEach((pageName) => {
      const layout = layoutOptions[pageName]['layout'] || 'layoutBase';
      const meta = layoutOptions[pageName]['meta'] || '';
      const header = layoutOptions[pageName]['header'] || '';
      const footer = layoutOptions[pageName]['footer'] || '';
      const page = layoutOptions[pageName]['page'] || '';
      const title = layoutOptions[pageName]['title'] || '';
      const srcList = [`${PATH.SRC.VIEWS_LAYOUT}/${layout}.ejs`, ...srcPath];
      const buildCssPath = `${PATH.RES.CSS}/${pageName}.css`;
      const buildJSPath = `${PATH.RES.JS}/${pageName}.js`;
      const vendorJSPath = `${PATH.RES.JS}/${vendorJsName}`;

      gulp.src(srcList)
        .pipe(gulpPlumber())
        .pipe(ejs({ meta, header, footer, page, title, buildCssPath, buildJSPath, vendorJSPath }))
        .pipe(rename({
          dirname: "",
          basename: pageName,
          prefix: "",
          suffix: "",
          extname: ".html"
        }))
        .pipe(gulp.dest(destPath || './dest/html'))
        .pipe(reload());
    });
  });

  const buildProdHtml = buildHtml({});
  const buildWatchHtml = buildHtml({ reload });

  gulp.task('build:html', () => {
    buildProdHtml()
  });

  gulp.task('watch:html', () => {
    buildWatchHtml()
  });
};