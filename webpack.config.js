const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
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
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(css|less)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {modules: { exportLocalsConvention: 'camelCase' }, sourceMap: true, import: true, importLoaders: 2}},
          {loader: 'postcss-loader', options: {postcssOptions: {plugins:[['autoprefixer',{}]]}}},
          {loader: 'less-loader'},
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: ['**/*.less']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC, 'index.html')
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(SRC, 'manifest.json'), to: DIST}
      ]
    }),
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
};
