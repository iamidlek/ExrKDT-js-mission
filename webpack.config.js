const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, options) => {
  return {
    resolve: {
      extensions: ['.js'],
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
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
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
      })
    ],
    devServer: {
      port: 8885,
      open: true,
    }
  }
}
