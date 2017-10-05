/* eslint-disable */
// $ yarn add webpack babel-loader
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ENV = process.env.NODE_ENV || 'development'
module.exports = {
  entry:
    ENV !== 'production'
      ? [
          'react-hot-loader/patch',
          'webpack-dev-server/client?http://localhost:3355',
          'webpack/hot/only-dev-server',
          './src/index.js'
        ]
      : ['react-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public',
    publicPath: '/'
  },
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    port: 3355
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    })
  ].concat(
    ENV === 'production'
      ? [
          new UglifyJSPlugin({
            parallel: {
              cache: true,
              workers: 2 // for e.g
            }
          }),
          new CompressionPlugin()
        ]
      : []
  )
}
