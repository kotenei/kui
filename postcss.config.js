// module.exports = {
//   plugins: {
//     'postcss-flexbugs-fixes': {},
//     'postcss-import': {},
//     'postcss-url': {},
//     'postcss-write-svg': {},
//     'postcss-preset-env': {},
//     'postcss-px-to-viewport': {
//       viewportWidth: 1540,
//       viewportHeight: 900,
//       unitPrecision: 4,
//       viewportUnit: 'vw',
//       minPixelValue: 2,
//       mediaQuery: false,
//     },
//     cssnano: {
//       'cssnano-preset-advanced': {
//         zindex: false,
//         autoprefixer: true,
//       },
//     },
//   },
// };

module.exports = {
  plugins: [require('autoprefixer')],
};

