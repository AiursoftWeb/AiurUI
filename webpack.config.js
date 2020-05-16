const path = require('path');

module.exports = {
  entry: {
    'AiurCore.js': [
      path.resolve(__dirname, 'js/AiurCore.js'),
    ]
  },
  output: {
    filename: 'AiurCore.min.js',
    path: path.resolve(__dirname, 'dist'),
  }
};