const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [],
};

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
  },
  plugins: [
    new CompressionPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
