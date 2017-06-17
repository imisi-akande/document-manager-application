const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'production';
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, './client/index.jsx'),
  target: 'web',
  output: {
    path: path.join(__dirname, '/client/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './lib/client')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, include: path.join(__dirname, 'client'), loaders: ['babel-loader'] },
      { test: /\.scss$/i, loader: ExtractTextPlugin.extract(['css-loader', 'autoprefixer-loader', 'sass-loader']) },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpg|png|svg)$/, loader: 'url-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
