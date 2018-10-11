const fs = require('fs');
const path = require('path');

const entry = {};
const pages = fs.readdirSync(path.resolve(__dirname, '../src/pages'));

if (pages) {
  pages.forEach((dir) => {
    entry[dir] = path.resolve(__dirname, `../src/pages/${dir}/index.js`);
  });
}

module.exports = entry;