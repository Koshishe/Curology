const path = require('path');

module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: '[name].bundle.js',
    publicPath: '/dist/js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  devServer: {
    overlay: true
  }
};
