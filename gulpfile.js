const PATH = require('./config/PATH.json');

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
} = require('./config/options.js');                          //

const layoutOptions = require('./config/layout.js');
//clear
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

require('./scripts/createAppTask.js')();