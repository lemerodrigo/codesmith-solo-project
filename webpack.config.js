const path = require('path');
const webpack = require('webpack');

module.exports = {
  // entry: './app/src/main.jsx',
  entry: ['webpack/hot/dev-server', './app/src/main.js'],
  output: {
    path: path.join(__dirname, 'build'),
    // Use the name specified in the entry key as name for the bundle file.
    filename: 'webpack-bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        // Test for js or jsx files.
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'react']
        },
      }
    ]
  },
  // externals: {
  //   'react': 'React' 
  // },
  // resolve: {
  //   // Include empty string '' to resolve files by their explicit extension
  //   // (e.g. require('./somefile.ext')).
  //   // Include '.js', '.jsx' to resolve files by these implicit extensions
  //   // (e.g. require('underscore')).
  //   extensions: ['', '.js', '.jsx']
  // }
};