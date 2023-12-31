// https://facebook.github.io/jest/docs/webpack.html#handling-static-assets
// fileTransformer.js
const path = require('path');

module.exports = {
  process (src, filename) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
