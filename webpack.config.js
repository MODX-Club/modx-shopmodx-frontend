var dir = 'bundle',
  path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/entries/app.js'
  },
  output: {
    path: path.join(__dirname, dir),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  externals: {
    alertify: 'alertify',
    callbacks: 'window.smxCallbacks'
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      img: 'src/images',
      less: 'src/styles/less',
      cmp: 'src/components',
      lib: 'src/helpers',
      core: 'src/core',
      const: 'src/constants',
      actions: 'src/actions'
    /* alertify: 'vendor/AlertifyJS/build/alertify.min.js'*/
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
      __PRODUCTION__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'false'))
    }),
    // new webpack.EnvironmentPlugin(["NODE_ENV", "BUILD_DEV", "BUILD_PRERELEASE"]),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.(le|c|sc|sa)ss/,
        exclude: /(node_modules)/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 versions!less?sourceMap')
      }, {
        test: /\.(jsx?)/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }, {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=100000&q=100'
      }, {
        test: /\.woff$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=[name].[ext]'
      }, {
        test: /\.woff2$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff2&name=[name].[ext]'
      }, {
        test: /\.(ttf|eot|svg|otf)$/,
        loader: 'url-loader?name=[name].[ext]'
      }
    ]
  }
}
