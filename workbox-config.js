const path = require('path');
module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,html,js,css,png}"
  ],
  "swDest": path.join(__dirname, 'service-worker.js'),
  "swSrc": "src/service-worker.js"
};