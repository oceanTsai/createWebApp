# 🐔 createWebApp
 createWebApp generator that scaffolds out a front-end web app using gulp for the build process

## 🐔 Installation
```shell
npm i create-lightweight-webapp --save-dev
```

## 🐔 Usage 
Then, add it to your `gulpfile.js`:

```javascript
require('create-lightweight-webapp')();
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
    "start": "gulp clean:all && gulp build:dev && gulp start:dev",
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
      --- layout
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
