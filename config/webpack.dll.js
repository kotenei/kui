const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vendor_react: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-dnd',
      'react-dnd-html5-backend',
      'react-transition-group',
    ],
    vendor_others: ['date-fns', 'classnames', 'dom-helpers', 'fast-deep-equal'],
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: path.resolve(__dirname, '..'),
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: '[name]_library',
    }),
  ],
};
