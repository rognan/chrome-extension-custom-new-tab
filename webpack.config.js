const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: {
    extension: path.resolve(SRC, 'index.js')
  },
  output: {
    path: DIST,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(css|less)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {modules: true, sourceMap: true, camelCase: true, import: true, importLoaders: 2}},
          {loader: 'postcss-loader', options: {ident: 'postcss', plugins: (loader) => [require('autoprefixer')()]}},
          {loader: 'less-loader'},
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC, 'index.html')
    }),
    new CopyWebpackPlugin([
      {from: path.resolve(SRC, 'manifest.json')}
    ]),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    contentBase: path.resolve(__dirname, DIST),
    hot: true
  }
}
