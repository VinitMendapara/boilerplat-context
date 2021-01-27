'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var { GenerateSW } = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /s3Proxy/,
          handler: 'CacheFirst'
        },
        {
          urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
          handler: 'CacheFirst'
        },
        {
          urlPattern: /.*/,
          handler: 'NetworkFirst'
        }
      ]
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    , {
      test: /\.json?$/,
      loader: 'file-loader',
      type: 'javascript/auto'
    },
    {
      test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.(png|jpg|jpeg|ttf|svg|gif)$/,
      loader: 'url-loader?limit=8192',
      options: {
        esModule: false,
      },
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=public/fonts/[name].[ext]'
    },
    {
      test: /\.(ico|mp4)$/,
      loader: 'file-loader?name=[name].[ext]'
    },
    {
      test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot)(\?[a-z0-9#=&.]+)?$/,
      loader: 'file-loader'
    },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          { loader: "style-loader", options: {} },
          { loader: "css-loader", options: {} },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env','autoprefixer']
              }
            }
          },
          { loader: "sass-loader", options: {} }
        ]
      },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true, 
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {},
          mangle: true,
          module: false,
          output: {
            comments: false
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        }
      }),
    ],
  }
};
