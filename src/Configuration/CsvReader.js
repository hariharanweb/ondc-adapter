import fs from 'fs';
import { parse } from 'csv-parse';

class CsvReader {
  constructor(filename) {
    this.filename = filename;
    this.mapResponse = new Map();
    // this.csvToMapConverter = this.csvToMapConverter.bind(this);
  }

  getMappedResponse() {
    return this.mapResponse;
  }

  async fileParser() {
    await this.csvToMapConverter(this.filename)
      .then((config) => {
        this.mapResponse = config;
      })
      .catch((err) => err);
  }

  async csvToMapConverter(file) {
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
}

export default CsvReader;
