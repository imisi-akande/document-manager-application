const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
    new webpack.NoEmitOnErrorsPlugin()
  ]

if (process.env.NODE_ENV === "test") {
  plugins.push(
      new webpack.HotModuleReplacementPlugin()
  )
}

if (process.env.NODE_ENV === "production") {
    plugins.push(
      new UglifyJSPlugin()
    )
  }
  
module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, './client/index.js'),
  output: {
    path: path.join(__dirname, '/client/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        }
      }
    ]
  },
  target: 'web',
  resolve: {
    extensions: ['.js']
  },
  plugins
};
