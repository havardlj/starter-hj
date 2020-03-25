const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.exec\.js$/,
        use: ['script-loader']
      }
    ]
  },
  entry: {
    'bundle': './src/js/index.js',
    'bundle.min': './src/js/index.js'
  },
  mode: 'production',
  output: {
    filename: '[name].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        extractComments: false,
      }),
    ],
  }
};