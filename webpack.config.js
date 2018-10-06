const { resolve } = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: './index.tsx',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()]
  },
  target: 'node',
  devtool: 'source-map',
  context: resolve(__dirname, './src'),
  output: {
    path: resolve(__dirname, './build'),
    filename: 'bundle.min.js',
    library: '',
    libraryTarget: 'commonjs'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract(
      //     'style-loader',
      //     { loader: 'css-loader', options: { importLoaders: 1 } },
      //     'sass-loader'
      //   )
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
