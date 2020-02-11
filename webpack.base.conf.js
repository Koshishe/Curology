const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageJSON = require('./package');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  cache: path.join(__dirname, './cache'),
};

const PAGES_DIR = `${ PATHS.src }/templates/pages/`;
const PAGES = glob.sync(`${ PAGES_DIR }**/*.twig`).map((page) => path.relative(PAGES_DIR, page).replace(/\\/g, '/'));

const NJK_DATA = require(`${ PATHS.src }/data/`);

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].bundle.js',
    pathinfo: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules|vendor-aux/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader',
          },
        },
      },
      {
        test: /\.twig$/,
        use: [
          'html-loader',
          {
            loader: 'njk-html-loader',
            options: {
              data: {
                ...NJK_DATA(),
                src: PATHS.src,
              },
              root: `${ PATHS.src }/templates`,
            },
          },
        ],
      },
      {
        test: /\.woff(2)?$/,
        loader: 'file-loader',
        options: {
          publicPath: (url, resourcePath) => `../${ path.relative(PATHS.src, resourcePath).replace(/\\/g, '/') }`,
          name: '[name].[ext]',
          emitFile: false,
        },
      },
      {
        test: /\.png|jp(e)?g|gif|svg$/i,
        loader: 'file-loader',
        options: {
          publicPath: (url, resourcePath) => `../${ path.relative(PATHS.src, resourcePath).replace(/\\/g, '/') }`,
          name: '[name].[ext]',
          emitFile: false,
          esModule: false,
        },
      },
    ],
  },
  resolve: {
    alias: {
      '~': PATHS.src,
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Simple Workflow Welcome | Pages list',
      templateParameters: {
        PROJECT_NAME: packageJSON.name,
        PAGES: PAGES.map((page) => page.replace(/\.twig/, '.html')),
      },
      template: `${ PATHS.src }/index.html`,
      filename: 'page-list.html',
      inject: false,
    }),
    new CopyWebpackPlugin([
      {
        from: `${ PATHS.src }/fonts`,
        to: `${ PATHS.dist }/fonts`,
        ignore: ['.gitkeep'],
      },
      {
        from: `${ PATHS.src }/img`,
        to: `${ PATHS.dist }/img`,
        ignore: ['.gitkeep'],
      },
      {
        from: `${ PATHS.src }/static`,
        to: `${ PATHS.dist }`,
        ignore: ['.gitkeep'],
      },
    ]),
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${ PAGES_DIR }/${ page }`,
      filename: `./html/${ page.replace(/\.twig/, '.html') }`,
      minify: false,
      hash: true,
    })),
  ],
};
