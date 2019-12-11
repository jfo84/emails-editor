const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV || 'production',
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
  plugins: [
    new CompressionPlugin(),
    new CopyPlugin([
      { from: 'public', to: path.resolve(__dirname, 'dist/') },
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'emails-editor.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hotOnly: true,
  },
};
