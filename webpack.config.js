const path = require('path');

const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/main.tsx',
  mode: 'production',
  target: 'web',
  devtool: false,
  output: {
    libraryTarget: 'system',
    libraryExport: 'main',
    publicPath: 'http://localhost:3333/',
  },
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
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'statics/imgs/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
        ],
      },
    ],
  },
  // externals: ["react", "react-dom"],
  plugins: [
    new ModuleFederationPlugin({
      name: 'autoetl_plugin_example',
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/entry.ts',
        './manifest.json': './manifest.json',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^17.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^17.0.0',
        },
        antd: {
          singleton: true,
        },
        mobx: {
          singleton: true,
        },
        'use-mobx-observable': {
          singleton: true,
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    port: 3333,
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
