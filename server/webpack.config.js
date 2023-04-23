const path = require('path');

const config = {
  entry: path.join(__dirname, './index.ts'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: 'development',
};

module.exports = config;
