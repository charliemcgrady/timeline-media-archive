const sharedConfig = require("./webpack.shared.config");
const merge = require("webpack-merge");

module.exports = merge(sharedConfig, {
  mode: "production",
  externals: {
    // Shim in the sharp files which are targeted for Linux when building for lambda
    'sharp': '../../opt/nodejs_shim_v1/node_modules/sharp',
    // GCP libraries were not bundling properly with webpack
    '@google-cloud/storage': '../../opt/nodejs_shim_v1/node_modules/@google-cloud/storage',
    '@google-cloud/vision': '../../opt/nodejs_shim_v1/node_modules/@google-cloud/vision'
  }
});
