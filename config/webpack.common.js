const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  resolve: {
    // modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.sass'],
    mainFields: ['main'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              include: path.resolve(__dirname, '../src'),
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('../dll/vendor_react-manifest.json'),
      context: path.resolve(__dirname, '..'),
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: require('../dll/vendor_mui-manifest.json'),
    //   context: path.resolve(__dirname, '..'),
    // }),
    new webpack.DllReferencePlugin({
      manifest: require('../dll/vendor_others-manifest.json'),
      context: path.resolve(__dirname, '..'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../dll'),
          to: path.resolve(__dirname, '../build'),
        },
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../build'),
          filter: async (resourcePath) => {
            if (resourcePath.indexOf('html') >= 0) {
              return false;
            }
            return true;
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    new WebpackBar(),
  ],
};
