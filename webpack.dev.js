var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + "/build",
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'style', to: 'style'},
      {from: 'index.html', to: 'index.html'},
      {from: 'selectedpin.png', to: 'selectedpin.png'}
    ])
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './build/'
  }
};