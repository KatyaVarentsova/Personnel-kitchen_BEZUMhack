const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    port: 8080,
    historyApiFallback: false
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'] 
    }),

    new HtmlWebpackPlugin({
      template: './src/questionnaire/questionnaire.html',
      filename: 'questionnaire.html',
      chunks: ['main']
    }),

    new HtmlWebpackPlugin({
      template: './src/results/results.html',
      filename: 'results.html',
      chunks: ['main']
    }),

    new HtmlWebpackPlugin({
      template: './src/board/applicants.html',
      filename: 'applicants.html',
      chunks: ['main']
    }),

    new HtmlWebpackPlugin({
      template: './src/board/invited.html',
      filename: 'invited.html',
      chunks: ['main']
    }),

    new HtmlWebpackPlugin({
      template: './src/success/success.html',
      filename: 'success.html',
      chunks: ['main']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images' }
      ]
    })
  ]
}