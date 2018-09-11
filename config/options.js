const PATH = require('./PATH.json');
const vendorCssName = 'vendor.css';
const uglifyOptions = {
  compress: {
    drop_console: true
  }
};
module.exports = {
  cleanOptions: {
    jsOptions: {
      delPath: {
        dev: [`${PATH.DEST.DEV.JS}/*.{js,map}`, `!${PATH.DEST.DEV.JS_VENDOR}`],
        prod: [`${PATH.DEST.PROD.JS}/*.{js,map}`, `!${PATH.DEST.PROD.JS_VENDOR}`]
      }
    },
    vendorJsOptions: {
      delPath: {
        dev: `${PATH.DEST.DEV.JS_VENDOR}/*.js`,
        prod: `${PATH.DEST.PROD.JS_VENDOR}/*.js`
      }
    },
    cssOptions: {
      delPath: {
        dev: PATH.DEST.DEV.CSS,
        prod: PATH.DEST.PROD.CSS
      }
    },
    imageOptions: {
      delPath: {
        dev: PATH.DEST.DEV.IMG,
        prod: PATH.DEST.PROD.IMG
      }
    },
    htmlOptions: {
      delPath: {
        dev: PATH.DEST.DEV.HTML,
        prod: PATH.DEST.PROD.HTML
      }
    },
    allOptions: {
      delPath: {
        dev: PATH.ROOT.DEST.DEV,
        prod: PATH.ROOT.DEST.PROD
      }
    }
  },
  jsOptions: {
    srcPath: `${PATH.SRC.JS_ENTRY}/**/*.js`,
    destPath: {
      dev: PATH.DEST.DEV.JS,
      prod: PATH.DEST.PROD.JS
    },
    mapPath: {
      dev: PATH.DEST.DEV.MAP,
      prod: PATH.DEST.PROD.MAP,
    },
    vendors: [],
    uglifyOptions: uglifyOptions
  },
  //javascript vendor
  vendorOptions: [
    {
      distName: "vendor.js",
      vendors: [], //'react', 'react-dom', 'axios'
      destPath: {
        dev: PATH.DEST.DEV.JS_VENDOR,
        prod: PATH.DEST.PROD.JS_VENDOR,
      },
      uglifyOptions: uglifyOptions
    },
    {
      distName: "vendor2.js",
      vendors: [],
      destPath: {
        dev: PATH.DEST.DEV.JS_VENDOR,
        prod: PATH.DEST.PROD.JS_VENDOR,
      },
      uglifyOptions: uglifyOptions
    }
  ],
  //css vendor
  vendorCssOptions: {
    distName: vendorCssName,
    vendors: [], //your node_modules 3rd css name. 
    manualVendors: [`${PATH.SRC.MANUAL_CSS}/**/*.css`, `${PATH.SRC.MANUAL_CSS}/**/*.min.css`], //your manaul 3rd css path.
    destPath: {
      dev: PATH.DEST.DEV.CSS,
      prod: PATH.DEST.PROD.CSS
    },
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
    destPath: {
      dev: PATH.DEST.DEV.CSS,
      prod: PATH.DEST.PROD.CSS
    },
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
    destPath: {
      dev: PATH.DEST.DEV.IMG,
      prod: PATH.DEST.PROD.IMG,
    },
    imageminOptions: {
      optimizationLevel: 5, //類型：Number 默認：3 取值範圍：0-7（優化等級）
      progressive: true,    //類型：Boolean 默認：false 無損壓縮jpg圖片
      interlaced: true,     //類型：Boolean 默認：false 隔行掃描gif進行渲染
      multipass: true       //類型：Boolean 默認：false 多次優化svg直到完全優化
    }
  },
  svgOptions: {
    srcPath: [`${PATH.SRC.SVG}/**/*.svg`],
    destPath: {
      dev: PATH.DEST.DEV.SVG,
      prod: PATH.DEST.PROD.SVG,
    }
  },
  serverOptions: {
    host: '0.0.0.0',
    port: 9527,
    root: `${PATH.ROOT.DEST.DEV}`,
    livereload: true,
  },
  // proxyOptions: {
  //   "/api/**": {
  //     target: "http://0.0.0.0:9528",
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api/': ''
  //     }     // rewrite path 
  //   },
  //   "/*.html": {
  //     target: "http://0.0.0.0:9527/html",
  //     changeOrigin: true
  //   },
  // },
  hotReloadOptions: {
    jsWatch: [`${PATH.SRC.JS_ENTRY}/**/*.js`, `${PATH.SRC.JS}/**/*.js`, `${PATH.SRC.VIEWS_REACT}/**/*.jsx`],
    scssWatch: [`${PATH.SRC.SCSS}/**/*.scss`, `${PATH.SRC.SCSS}/common/**/*.scss`],
    htmlWatch: [`${PATH.SRC.VIEWS}/*.ejs`, `${PATH.SRC.VIEWS_LAYOUT}/**/*.ejs`, `${PATH.SRC.VIEWS_SHARED}/**/*.ejs`]
  },
  htmlOptions: {
    srcPath: [`!${PATH.SRC.VIEWS_REACT}/**/*.{ejs,jsx}`, `!${PATH.SRC.VIEWS_SHARED}/**/*.ejs`],
    destPath: {
      dev: PATH.DEST.DEV.HTML,
      prod: PATH.DEST.PROD.HTML,
    }
  }
}
