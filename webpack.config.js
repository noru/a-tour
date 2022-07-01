const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  mode: 'development',
  target: 'web',
  devtool: false,
  optimization: {
    // minimize: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css', '.sass', '.less'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-typescript'],
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'aTour',
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/index.ts',
      },
      shared: {},
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    port: 3335,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  performance: {
    hints: false,
  },
};
