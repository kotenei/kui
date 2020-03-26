const path = require('path');
const fs = require('fs')
const resolve = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = async ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.(js|ts)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    },
    {
      test: /\.(svg|eot|ttf|woff|woff2)/,
      use: 'url-loader?limit=1000&name=fonts/[name].[ext]&publicPath=../',
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      use: 'url-loader?limit=1000&name=images/[name].[ext]',
    },
  );
  config.resolve.alias = {
    ...config.resolve.alias,
    'kui-react': resolve('src'),
  };
  config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');
  return config;
};
