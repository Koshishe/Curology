const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].bundle.js',
    publicPath: 'dist/js'
  },
  devtool: 'source-map',//@todo
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            },
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      ignoreOrder: true
    }),
  ]
};
