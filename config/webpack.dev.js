const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].js',
    pathinfo: false,
    assetModuleFilename: 'images/[name][ext][query]',
  },
  cache: {
    type: 'memory',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    usedExports: true,
  },
  devServer: {
    historyApiFallback: true,
    // contentBase: path.resolve(__dirname, '../build'),
    // open: false,
    // hot: true,
    // quiet: true,
    static: {
      directory: path.join(__dirname, '../build'),
    },
    port: 8080,
  },
});
