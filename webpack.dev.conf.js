const webpack = require('webpack');
const merge = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    watchContentBase: true,
    overlay: true,
    host: '0.0.0.0',
    port: 8081,
    progress: true,
    hot: true,
    index: 'page-list.html',
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
        exclude: /node_modules|vendor-aux/,
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new StylelintPlugin({
      files: ['**/*.{vue,scss,twig}'],
    }),
    new ExtraWatchWebpackPlugin({
      dirs: [`${ baseWebpackConfig.externals.paths.src }/scss`],
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
