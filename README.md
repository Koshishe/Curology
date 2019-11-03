# Simple workflow
Project workflow using [webpack 4](https://webpack.js.org/).

## Getting started
Install packages with npm:
```bash
npm install
```
Or with yarn:
```bash
yarn
```
## Scripts
For development using [webpack-dev-server](https://webpack.js.org/configuration/dev-server/):
```bash
npm run dev
```
Build for production:
```bash
npm run build
```
## Directory Structure
### cache
Used by [imagemin-webpack-plugin](https://github.com/Klathmon/imagemin-webpack-plugin) to cache already minified images. On next run plugin will check for the cached images first. If cached image exists it will simply use that one. Otherwise image will be optimised and written to the folder for later builds.
### dist
Compiled files after the build script.
### src
All source files except packages imported from node_modules. This is the directory you should work in. In the root of this folder you can find webpack entry point file `index.js` and pages list template `index.ejs`.
#### data
##### json
All `.json` files which will be merged into one data object and passed to [njk-html-loader](https://github.com/nameless19922/njk-html-loader) to use for all templates in the loader. Unfortunately, without hot reload for now.
#### fonts
Project fonts.
#### img
Project images. All images are minified during build script by [imagemin-webpack-plugin](https://github.com/Klathmon/imagemin-webpack-plugin).
#### js
Script files split into directories:
##### modules
Your custom script files typically imported into `app.js`.
##### utils
Handy js utilities and functions.
##### vendor-aux
Vendor scripts which do not come as a [npm](https://www.npmjs.com/) package.
#### scss
Style files split into directories:
##### base
Global scss config.
##### modules
Your custom style files, each used to style one html block (component). Module file name should match block class name. See also <https://ru.bem.info/>. All modules are automatically imported.
##### vendor
Vendor styles for third party css or js libraries, plugins or frameworks. 
#### static
Files that should be put into the server root (`/static/robots.txt` is accessible under `http://localhost:8081/robots.txt`).
#### templates
[Nunjucks](https://mozilla.github.io/nunjucks/) templates in `.twig` extension for better IDE support, split into directories:
##### components
Reusable chunks of content - [Nunjucks macros](https://mozilla.github.io/nunjucks/templating.html#macro) which can be [imported](https://mozilla.github.io/nunjucks/templating.html#import) into other templates.
##### layouts
Page layouts.
##### modules
Templates to be [included](https://mozilla.github.io/nunjucks/templating.html#include) into other templates.
##### pages
Pages templates. You create new pages by creating files in this folder. Pages list is available under <http://localhost:8081> while running dev script or `index.html` in the `dist` folder after running build script. 
#### vue-components
All `.vue` files.
### Additional features
#### Babel 7
Babel is used as a JavaScript compiler. Config: `.babelrc`.
#### Eslint
Used for linting `.js` and `.vue` files except `node_modules` and `vendor-aux` directories. Config: `.eslintrc.js`.
#### Stylelint
Used for linting `.scss` and `.vue` files. Config: `.stylelintrc`.
#### Postcss
CSS gets [autoprefixed](https://github.com/postcss/autoprefixer) and compressed with [cssnano](https://cssnano.co/). Config: `postcss.config.js`.
