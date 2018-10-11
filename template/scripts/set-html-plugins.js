const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const entry = require('./set-entry');

const htmls = [];

if (entry) {
  Object.keys(entry).forEach((name) => {
    htmls.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        chunks: [`${name}`],
        template: path.resolve(__dirname, `../src/pages/${name}/index.html`),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
        hash: process.env.NODE_ENV === 'production'
      })
    );
  });
}

module.exports = htmls;