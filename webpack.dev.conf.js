const webpack = require('webpack');
const merge = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    open: true,
    overlay: true,
    port: 8081,
    progress: true
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new StylelintPlugin()
  ]
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
