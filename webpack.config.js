const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const DotenvWebpack = require('dotenv-webpack')

module.exports = (env, options) => {
  console.log(env,options)
  return {
    resolve: {
      extensions: ['.js','.vue'],
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    },
    entry: './src/main.js',
    output: {
      publicPath: '/',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "~/scss/style";'
              }
            }
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'static' }
        ]
      }),
      new VueLoaderPlugin(),
      new DotenvWebpack(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      })
    ],
    devServer: {
      historyApiFallback: true,
      port: 8083,
      open: true,
    }
  }
}
