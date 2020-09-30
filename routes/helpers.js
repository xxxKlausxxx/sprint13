const fs = require('fs');
const path = require('path');

const readFile = (fileName) => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, '..', 'data', fileName), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      reject(err);
    } else {
      try {
        const users = JSON.parse(data);
        resolve(users);
        return;
      } catch (e) {
        reject(e);
      }
    }
  });
});

module.exports = readFile;
