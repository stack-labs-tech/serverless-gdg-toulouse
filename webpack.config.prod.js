const TerserWebpackPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.config.common')();

module.exports = () => (merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserWebpackPlugin()],
  },
}));
