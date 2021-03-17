const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const CURRENT_WORKING_DIR = process.cwd();
console.log(CURRENT_WORKING_DIR);

module.exports = {
  entry: [
    '@babel/polyfill',
    path.join(CURRENT_WORKING_DIR, 'client/app/index.jsx')
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.html'],
    alias: {
      app: 'client/app'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin([
      {
        from: 'client/public'
      }
    ])
  ]
};
