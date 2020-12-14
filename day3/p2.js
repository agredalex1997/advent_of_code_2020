const fs = require('fs');
const { treeCounter } = require('./treeCounter.js');

fs.readFile(`${__dirname}/map.txt`, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  if (data) {
    const lines = data.split(/[\r\n]/);
    console.log(treeCounter(lines, { right: 1, down: 1 }) * treeCounter(lines, { right: 3, down: 1 }) * treeCounter(lines, { right: 5, down: 1 }) * treeCounter(lines, { right: 7, down: 1 }) * treeCounter(lines, { right: 1, down: 2 }));
  }
});
