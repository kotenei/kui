const path = require('path');
const fs = require('fs');
const resolve = (relativePath) => path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  stories: ['../stories/**/index.js'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
      },
    },
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.(ts|js)x?$/],
          include: [path.resolve(__dirname, '../stories')], // You can specify directories
        },
      },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  logLevel: 'warn',

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(js|ts)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    });
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'kui-react': resolve('src'),
    };

    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');

    return config;
  },
};
