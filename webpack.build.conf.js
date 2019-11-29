const webpack = require('webpack');
const merge = require('webpack-merge');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
const ImageminMozjpeg = require('imagemin-mozjpeg');
const baseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new ImageminPlugin({
      test: /\.png|jp(e)?g|gif|svg$/i,
      optipng: null,
      jpegtran: null,
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      },
      pngquant: {},
      plugins: [
        ImageminMozjpeg(),
      ],
      cacheFolder: baseWebpackConfig.externals.paths.cache,
    }),
    new webpack.ProgressPlugin({
      activeModules: true,
      entries: true,
      modules: true,
      profile: true,
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
