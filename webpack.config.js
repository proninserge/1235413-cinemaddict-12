'use strict';

const path = require('path');
const currentPath = path.join(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: currentPath
  },
  devtool: 'source-map',
  devServer: {
    contentBase: currentPath,
    watchContentBase: true
  }
};
