const sharedConfig = require("./webpack.shared.config");
const merge = require("webpack-merge");
const path = require('path');

module.exports = merge(sharedConfig, {
  mode: "development",
  watch: true,
  externals: {
    'sharp': 'commonjs sharp',
    // GCP libraries were not bundling properly with webpack
    '@google-cloud/storage': 'commonjs @google-cloud/storage',
    '@google-cloud/vision': 'commonjs @google-cloud/vision'
  }
});
