const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');
require('dotenv').config();
//const httpServer = require('http-server');
const { NODE_ENV } = process.env
const inDevelopment = NODE_ENV === "development";

const port = 3002;
const BASE_URL_PUBLIC = process.env.BASE_URL_PUBLIC
let publicUrl = `ws://${BASE_URL_PUBLIC}/ws`; //let publicUrl = `wss://${BASE_URL_PUBLIC}/ws`;
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
  publicUrl = `wss://${port}-${host}/ws`;
}
// Obtiene las rutas de los certificados SSL
const keyPath = path.join(__dirname, 'server.key');
const certPath = path.join(__dirname, 'server.crt');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    minimize: false, // Asegurar que el código se minifique
    splitChunks: {
      chunks: 'all',
    },
  },
  cache: {
    type: 'filesystem', // Utiliza la caché del sistema de archivos
  },
  watchOptions: {
    poll: 1000, // Intervalo en milisegundos para verificar cambios de archivos
    aggregateTimeout: 500, // Tiempo en milisegundos antes de considerar los cambios como completos
  },
  devServer: {
    port,
    hot: true,
    allowedHosts: "all",
    /* https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }, */
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    client: {
      webSocketURL: publicUrl
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: !inDevelopment ? /node_modules\/(?!(@atlaskit\/tooltip))/ : /(node_modules)/,
        options: {
          cacheDirectory: inDevelopment,
          cacheCompression: false,
        },
      }
    ]
  }
});

