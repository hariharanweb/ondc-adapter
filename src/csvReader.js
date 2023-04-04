import fs from 'fs';
import { parse } from 'csv-parse';

// Read the file and return the configuration
function readConfig(file) {
  // Read the file as text
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        const itemMapper = new Map();
        fs.createReadStream(file, 'utf8').pipe(parse({ delimiter: ',', from_line: 2 }))
          .on('data', (csvRow) => {
            itemMapper.set(csvRow[0], csvRow[2]);
          })
          .on('error', (error) => {
            reject(error);
          })
          .on('end', () => {
            resolve(itemMapper);
          });
      }
    });
  });
}

// Usage example

const fileParser = () => {
  readConfig('src/test.xls')
    .then((config) => {
      console.log(config);
    })
    .catch((err) => {
      console.error(err);
    });
};

export default fileParser;
