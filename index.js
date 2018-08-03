const pathFile = `${process.cwd()}/config/PATH.json`;
const optionsFile = `${process.cwd()}/config/options.js`;
const layoutFile = `${process.cwd()}/config/layout.js`;
require('./scripts/createAppTask.js')();

module.exports = () => {
  try{
    const PATH = require(pathFile);
    const {
      cleanOptions,
      scssOptions,
      serverOptions,
      hotReloadOptions,
      htmlOptions,
      imgOptions,
      svgOptions,
      vendorOptions,
      jsOptions
    } = require(optionsFile);  
    //
    const layoutOptions = require(layoutFile);
    //console.log(cleanOptions)
    require('./scripts/cleanTask.js')(cleanOptions);
    //javascript task
    require('./scripts/jsTask.js')({ jsOptions, vendorOptions });
    //vendor js task
    require('./scripts/vendorJsTask.js')(vendorOptions);
    //scss task
    require('./scripts/cssTask.js')(scssOptions);
    //image task
    require('./scripts/imageTask.js')({ imgOptions, svgOptions });
    //html task
    require('./scripts/htmlTask.js')({ htmlOptions, layoutOptions }, PATH);
    //hot reload task
    require('./scripts/hotReloadTask.js')({ serverOptions, hotReloadOptions });
    //command task
    require('./scripts/commandTask.js')();
  }catch(e){
  }
};