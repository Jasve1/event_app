const path = require('path');
module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,html,js,css,png}"
  ],
  "swDest": path.join(__dirname, 'sw.js'),
  "swSrc": "src/sw.js"
};