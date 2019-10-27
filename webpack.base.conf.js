const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.woff(2)?$/,
        loader: 'file-loader',
        options: {
          publicPath: '../fonts/',
          name: '[name].[ext]',
          emitFile: false
        }
      },
      {
        test: /\.png|jp(e)?g|gif|svg$/,
        loader: 'file-loader',
        options: {
          publicPath: '../img/',
          name: '[name].[ext]',
          emitFile: false
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      inject: false,
      minify: false
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/fonts`,
        to: `${PATHS.dist}/fonts`,
        ignore: ['.gitkeep']
      },
      {
        from: `${PATHS.src}/img`,
        to: `${PATHS.dist}/img`,
        ignore: ['.gitkeep']
      },
      {
        from: `${PATHS.src}/static`,
        to: `${PATHS.dist}`
      }
    ])
  ]
};
