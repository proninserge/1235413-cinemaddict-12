'use strict';

const path = require('path');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const momentDurationFormatSetup = require(`moment-duration-format`);
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
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};
