const PATH = require('./PATH.json');
const vendorJsName = 'vendor.js';
const vendorCssName = 'vendor.css';
module.exports = {
  cleanOptions: {
    jsOptions: {
      delPath: [`${PATH.DEST.JS}/*.{js,map}`, `!${PATH.DEST.JS}/${vendorJsName}`]
    },
    vendorJsOptions: {
      delPath: `${PATH.DEST.JS}/${vendorJsName}`
    },
    cssOptions: {
      delPath: PATH.DEST.CSS
    },
    imageOptions: {
      delPath: PATH.DEST.IMG
    },
    htmlOptions: {
      delPath: PATH.DEST.HTML
    },
    allOptions: {
      delPath: PATH.ROOT.DEST
    }
  },
  jsOptions: {
    srcPath: `${PATH.SRC.JS_ENTRY}/**/*.js`,
    destPath: PATH.DEST.JS,
    mapPath: PATH.DEST.MAP,
    vendors: [],
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  //javascript vendor
  vendorOptions: {
    distName: vendorJsName,
    vendors: [], //'react', 'react-dom', 'axios'
    destPath: PATH.DEST.JS,
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  //css vendor
  vendorCssOptions: {
    distName: vendorCssName,
    vendors:[], //your node_modules 3rd css name. 
    manualVendors: [`${PATH.SRC.MANUAL_CSS}/**/*.css`, `${PATH.SRC.MANUAL_CSS}/**/*.min.css`], //your manaul 3rd css path.
    destPath: PATH.DEST.CSS,
    cleanCssOptions: {
      compatibility: 'ie7',
      //keepBreaks: true,
      keepSpecialComments: '*'
    },
    autoprefixerOption: {
      browsers: ["last 4 versions", "ie >= 7"],
      cascade: false
    }
  },
  scssOptions: {
    srcPath: [`${PATH.SRC.SCSS}/**/*.scss`, `!${PATH.SRC.SCSS}/common/**/*.scss`],
    destPath: PATH.DEST.CSS,
    cleanCssOptions: {
      compatibility: 'ie7',
      //keepBreaks: true,
      keepSpecialComments: '*'
    },
    autoprefixerOption: {
      browsers: ["last 4 versions", "ie >= 7"],
      cascade: false
    }
  },
  imgOptions: {
    srcPath: [`${PATH.SRC.IMG}/**/*.{jpg,png,gif}`],
    destPath: PATH.DEST.IMG,
    imageminOptions: {
      optimizationLevel: 5, //類型：Number 默認：3 取值範圍：0-7（優化等級）
      progressive: true,    //類型：Boolean 默認：false 無損壓縮jpg圖片
      interlaced: true,     //類型：Boolean 默認：false 隔行掃描gif進行渲染
      multipass: true       //類型：Boolean 默認：false 多次優化svg直到完全優化
    }
  },
  svgOptions: {
    srcPath: [`${PATH.SRC.SVG}/**/*.svg`],
    destPath: PATH.DEST.SVG
  },
  serverOptions: {
    host: '0.0.0.0',
    port: 9527,
    root: `${PATH.ROOT.DEST}`,
    livereload: true,
  },
  // proxyOptions: {
  //   "/logout": {
  //     target: "http://0.0.0.0:9528",
  //     changeOrigin:true
  //   }
  // },
  hotReloadOptions: {
    jsWatch: [`${PATH.SRC.JS_ENTRY}/**/*.js`, `${PATH.SRC.JS}/**/*.js`, `${PATH.SRC.VIEWS_REACT}/**/*.jsx`],
    scssWatch: [`${PATH.SRC.SCSS}/**/*.scss`, `${PATH.SRC.SCSS}/common/**/*.scss`],
    htmlWatch: [`${PATH.SRC.VIEWS}/*.ejs`,`${PATH.SRC.VIEWS_LAYOUT}/**/*.ejs`,`${PATH.SRC.VIEWS_SHARED}/**/*.ejs`]
  },
  htmlOptions: {
    srcPath: [`!${PATH.SRC.VIEWS_REACT}/**/*.{ejs,jsx}`, `!${PATH.SRC.VIEWS_SHARED}/**/*.ejs`],
    destPath: PATH.DEST.HTML,
    vendorJsName
  }
}
