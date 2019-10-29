const path = require('path');
const fs = require('fs');

const JSON_DIR = path.resolve(__dirname, './json');
const merged = {};
const files = fs.readdirSync(JSON_DIR).filter(fileName => fileName.endsWith('.json'));

files.forEach((filename) => {
  const contents = JSON.parse(fs.readFileSync(path.resolve(JSON_DIR, filename), 'utf8'));
  Object.assign(merged, contents);
});

module.exports = {
  NJK_DATA: merged
};
