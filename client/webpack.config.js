const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  output: {
    filename: 'static/js/index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/},
      {test: /\.(ts|tsx)$/, use: ['ts-loader'], exclude: /node_modules/},
      {test: /\.(css|scss)$/, use: ['style-loader', 'css-loader']},
      {test: /\.(jpg|jpeg|png|gif|mp3|svg)$/, use: ['file-loader']},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new ProgressPlugin(true),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      progress: true,
    },
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
