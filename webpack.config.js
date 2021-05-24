const path = require('path');

var config = {
  module: {
      rules: [
          {
              test: /\.s[ac]ss$/i,
              use: [
              'style-loader',
              'css-loader',
              'sass-loader',
              ],
          },
      ],
  },
};

var indexConfig = Object.assign({}, config, {
  name: "index",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "index.bundle.js"
  },
});
var photographeConfig = Object.assign({}, config, {
  name: "photographe",
  entry: "./src/photographe.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "photographe.bundle.js"
  },
});
var formulaireConfig = Object.assign({}, config, {
  name: "formulaire",
  entry: "./src/formulaire.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "formulaire.bundle.js"
  },
});

// Return Array of Configurations
module.exports = [
  indexConfig, photographeConfig, formulaireConfig
];