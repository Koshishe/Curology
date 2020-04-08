const webpack = require('webpack');
const merge = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const del = require('del');
const GlobImporter = require('node-sass-glob-importer');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: [
      baseWebpackConfig.externals.paths.dist,
      `${ baseWebpackConfig.externals.paths.src }/templates`,
    ],
    watchContentBase: true,
    overlay: true,
    host: '0.0.0.0',
    port: 8081,
    progress: true,
    hot: true,
    index: 'page-list.html',
    before() {
      del.sync([baseWebpackConfig.externals.paths.dist]);
    },
  },
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        options: {
          cache: true,
        },
        exclude: /node_modules|vendor/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                importer: GlobImporter(),
                sourceMapRoot: '/',
              },
              // prependData: '@import "~/scss/base/_includes.scss";', /* for vue components */
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new StylelintPlugin({
      files: [
        'src/scss/**/*.scss',
        'src/vue-components/**/*.vue',
      ],
      cache: true,
    }),
    new ExtraWatchWebpackPlugin({
      dirs: [`${ baseWebpackConfig.externals.paths.src }/scss`],
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
