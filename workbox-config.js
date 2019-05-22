const rootPath = require('app-root-path');
const path = require('path');
module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,html,js,css,png}"
  ],
  "swDest": path.join(rootPath, 'sw.js'),
  "swSrc": "src/sw.js"
};