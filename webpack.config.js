const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var files = ['AiurCore', 'AiurDashboard', 'AiurProduct', 'AiurMarket'];

var js = files.map(f => {
  return {
    mode: "production",
    entry: path.resolve(__dirname, `js/${f}.js`),
    output: {
      filename: `${f}.min.js`,
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
      libraryExport: 'default'
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({})
      ]
    }
  }
});
var css = files.map(f => {
  return {
    plugins: [new MiniCssExtractPlugin({
      filename: `${f}.min.css`,
    })],
    mode: 'production',
    entry: path.resolve(__dirname, `css/${f}.scss`),
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            // // {
            // //   loader: 'file-loader',
            // //   options: {
            // //     name: '[name].min.css',
            // //   }
            // // },
            // {
            //   loader: MiniCssExtractPlugin.loader,
            // },
            // {
            //   loader: 'css-loader'
            // },
            // {
            //   loader: 'sass-loader'
            // }
            MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: {
                url: false
              }
            }, 'sass-loader'
          ],
        },
      ]
    }
  }
});
module.exports = js.concat(css);