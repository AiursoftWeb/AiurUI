const path = require('path');

module.exports = [
  {
    mode: "production",
    entry: {
      'AiurCore.js': [
        path.resolve(__dirname, 'js/AiurCore.js'),
      ]
    },
    output: {
      filename: 'AiurCore.min.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'window'
    }
  },
  {
    mode: "production",
    entry: {
      'AiurDashboard.js': [
        path.resolve(__dirname, 'js/AiurDashboard.js'),
      ]
    },
    output: {
      filename: 'AiurDashboard.min.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'window'
    }
  }
];