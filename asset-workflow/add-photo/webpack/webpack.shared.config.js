const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/main.ts'),
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'main',
    libraryTarget: 'commonjs2'
  }
};
