# 🐔 createWebApp
 createWebApp generator that scaffolds out a front-end web app using gulp for the build process

## 🐔 Environment
node 8.10
npm 5.6.0

## 🐔 Installation
```shell
npm i create-lightweight-webapp --save-dev
```

## 🐔 Usage 
Then, add it to your `gulpfile.js`:

```javascript
require('create-lightweight-webapp')();
```

If you don't have a gulpfile.js and your os is mac
```shell
echo "require('create-lightweight-webapp')();" > gulpfile.js
```

then, in your terminal enter 
```shell
gulp create:f2eApp
```

you can, in your package.json write

```json
{
  "scripts": {
    "build:prod": "gulp clean:all && gulp build:prod",
    "build:dev": "gulp clean:all && gulp build:dev",
    "start": "gulp clean:all && gulp build:dev && gulp start:dev"
  }
}
```

now, you can in terminal enter
- Run `npm run start` start http server and enable hot Reload service.
- Run `npm run build:dev`
- Run `npm run build:prod` 

## 🐔 All Script

clear
- `gulp clean:css`
- `gulp clean:js`
- `gulp clean:js-vendor`
- `gulp clean:img`
- `gulp clean:html`
- `gulp clean:all`

js
- `gulp build:js-dev`  compile js 、 jsx output js 
- `gulp build:js-prod`  compile js 、 jsx output minify and Uglify js 
- `gulp watch:js`

vendor js
- `gulp build:js-vendor` compile common js library into vendor.js

css
- `gulp build:scss-dev`  compile SCSS into CSS
- `gulp build:scss-prod`  compile SCSS into minify CSS
- `gulp watch:scss` 

html
- `gulp build:html`
- `watch:html`

image
jpg、png、gif
- `build-img:dev`
- `build-img:prod`

hot reload
- `gulp connect` start http server
- `gulp watch` watch html、js、scss、react

other
- `gulp start:dev`
- `gulp build:dev`
- `gulp build:prod`


## 🐔 createWebApp Architecture
```text
  - config
    -- layout.js
    -- options.js
    -- PATH.json
  - dest
  - scripts                    //gulp task
    -- cleanTask.js
    -- commandTask.js
    -- commonJoinPoint.js
    -- createAppTask.js
    -- cssTask.js
    -- hotReloadTask.js
    -- htmTask.js
    -- imageTask.js
    -- jsTask.js
    -- vendorJsTask.js
  - src                         // base architecture
    -- entry
      guideline.js              // example, web page main js file.
      home.js                   // example, web page main js file.
    -- font
    -- img
      react.png                 // example.
    -- js
      util.js                   // common js example.
    -- scss                     // web page main css file.
      --- common                //
        guideline.css           // example, common scss.
      guideline.scss            // example, web page main scss.
      home.scss                 // example, web page main scss.
    -- views
      --- layout
        layoutBase.ejs          // page template.
      --- react                 
        --- components          // react component.
          Button.jsx            // example, react component.
        GuidelineContainer.jsx  // example, react container
      --- shared                // partial view
      guideline.ejs             // example, web page main content.
      home.ejs                  // example, web page main content.
  .babelrc                      // babel compile options
  .gitignore
  index.js
  LICENSE
  package-lock.json
  package.json
  README.md
```


## 🐔 use vendor
```text
edit /config/options.js
```

```text
vendorOptions: {
    distName: vendorJsName,
    `vendors: ['react', 'react-dom', 'axios'],`   // enter your vendor library
    destPath: PATH.DEST.JS,
    uglifyOptions: {
      compress: {
        drop_console: true
      }
    }
},
```

note: Remember install your vendor library

ex: 
```shell
npm i react --save
```

```shell
npm i react-dom --save
```

```shell
npm i axios --save
```

## 🐔 use layout
layout config in `config/layout.js`.


layout.js example
``` text
module.exports = {
  guideline: {
    layout: 'layoutBase',
    meta: 'metaBase',
    header: 'headerBase',
    footer: 'footerBase',
    page: 'guideline',
    title: "風格指南"
  },
  home: {
    layout: 'layoutBase',
    meta: 'metaBase',
    header: 'headerBase',
    footer: 'footerBase',
    page: 'home',
    title: "首頁"
  },
  //format
  [your page name.] : {
    layout: [`your layout file name.`],   //layout.ejs file need create in src/views/layout
    meta: [`your meta file name.`],       //meta.ejs file need create in src/views/shared
    header: [`your header file name.`],   //header.ejs file need create in src/views/shared
    footer: [`your footer file name.`],   //footer.ejs file need create in src/views/shared
    page: [`your page main container file name.`],  //page.ejs file need create in src/views
    title: [`your page title name`]
  }
}
```
how add page 

1. add page to layout.js

``` javascript
module.exports = {
  guideline: {
    layout: 'layoutBase',
    meta: 'metaBase',
    header: 'headerBase',
    footer: 'footerBase',
    page: 'guideline',
    title: "風格指南"
  },
  home: {
    layout: 'layoutBase',
    meta: 'metaBase',
    header: 'headerBase',
    footer: 'footerBase',
    page: 'home',
    title: "首頁"
  },
  test: {
    layout: 'layoutBase',
    meta: 'metaBase',
    header: 'headerBase',
    footer: 'footerBase',
    page: 'test',
    title: "test"
  } 
}
```

2. create test.ejs file in src/views folder.

```html
<p class="helloWord">hello word! im test</p>
```

``` text
-src
  -- views
    test.ejs
```

3. create test.js file in src/entry
```javascript
console.log("hello word! im test page.");
```


4. create test.css file in src/scss
```scss
@import "./common/guideline";
.helloWord{
  color: red;
  font-size: 26px;
}
```


5. run build script
```shell
npm run build:dev or gulp build:dev
```


note: 
you can run `npm run start` test your page.


open your browser at url enter http://0.0.0.0:9527/html/test.html

