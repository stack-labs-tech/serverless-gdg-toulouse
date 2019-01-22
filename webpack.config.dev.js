const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common')();

module.exports = () => (merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
  },
  devtool: 'inline-source-map',
}));
