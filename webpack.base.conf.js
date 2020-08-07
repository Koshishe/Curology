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

const PAGES_DIR = `${PATHS.src}/templates/pages/`;
const PAGES = glob.sync(`${PAGES_DIR}**/*.twig`).map((page) => path.relative(PAGES_DIR, page).replace(/\\/g, '/'));

const fileLoaderImagesOptions = {
  publicPath: (url, resourcePath) => `../${path.relative(PATHS.src, resourcePath).replace(/\\/g, '/')}`,
  name: '[name].[ext]',
  emitFile: false,
  esModule: false,
};

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
          test: /node_modules|vendor/,
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
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules|vendor/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.twig$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
          {
            loader: 'njk-html-loader',
            options: {
              data: {
                src: PATHS.src,
              },
              root: [
                `${PATHS.src}/templates`,
                `${PATHS.src}/data`,
              ],
              configuration: {
                autoescape: false,
                trimBlocks: true,
              },
            },
          },
        ],
      },
      {
        test: /\.woff(2)?$/,
        loader: 'file-loader',
        options: {
          publicPath: (url, resourcePath) => `../${path.relative(PATHS.src, resourcePath).replace(/\\/g, '/')}`,
          name: '[name].[ext]',
          emitFile: false,
        },
      },
      {
        test: /\.png|jp(e)?g|gif$/i,
        loader: 'file-loader',
        options: fileLoaderImagesOptions,
      },
      {
        test: /\.svg$/i,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: 'vue-svg-loader',
          },
          {
            loader: 'file-loader',
            options: fileLoaderImagesOptions,
          },
        ],
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
      templateParameters: {
        PROJECT_NAME: packageJSON.name,
        PAGES: PAGES.map((page) => page.replace(/\.twig/, '.html')),
      },
      template: `${PATHS.src}/index.ejs`,
      filename: 'page-list.html',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/fonts`,
          to: `${PATHS.dist}/fonts`,
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/.gitkeep'],
          },
        },
        {
          from: `${PATHS.src}/img`,
          to: `${PATHS.dist}/img`,
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/.gitkeep'],
          },
        },
        {
          from: `${PATHS.src}/static`,
          to: `${PATHS.dist}`,
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/.gitkeep'],
          },
        },
      ],
    }),
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./html/${page.replace(/\.twig/, '.html')}`,
      minify: false,
      hash: true,
    })),
  ],
};
