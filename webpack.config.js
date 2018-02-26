const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  watch: true,
  resolve: {

    extensions: ['.js', '.jsx'],
  },

  devtool: "#eval-source-map",
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },

    ]


  }

};