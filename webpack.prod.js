const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/* module.exports = merge(common, {
    mode: 'production',
    optimization: {        
        minimize: true, // Asegurar que el código se minifique
      },
    output: {
        publicPath: './'
    },
    plugins: [
        new Dotenv({
            safe: true,
            systemvars: true
        })
    ]
}); */

module.exports = {
  mode: 'production',
  entry: './src/js/index.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: '[name].bundle.js', // Use [name] to generate unique filenames
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpiling JavaScript
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extract CSS to a separate file
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: {
          loader: 'file-loader', // Handle image and font files
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Inject styles into DOM (only for development)
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader'   // Compiles Sass to CSS
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // Inject styles into DOM (only for development)
          'css-loader',   // Translates CSS into CommonJS
          'less-loader'   // Processes Less to CSS
        ]
      }
    ],
  },
  plugins: [
    /* new HtmlWebpackPlugin({
      template: './public/index.html', // Your HTML template
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }), */
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Extracted CSS filename
    }),
    new HtmlWebpackPlugin({
      favicon: '4geeks.ico',
      template: 'template.html'
    }),
    new Dotenv({
      safe: true,
      systemvars: true
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new OptimizeCSSAssetsPlugin(), // Minify CSS
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
};
