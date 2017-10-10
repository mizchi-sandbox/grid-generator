/* eslint-disable */
// $ yarn add webpack babel-loader
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ENV = process.env.NODE_ENV || 'development'
const pkg = require('./package')

const hmrEntries = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3355',
  'webpack/hot/only-dev-server'
]

const deps = Object.keys(pkg.dependencies)

module.exports = {
  entry: {
    vendor: (ENV !== 'production' ? hmrEntries : []).concat(deps),
    app: ['./src/index.js']
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
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
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
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
