import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

export default class PlatformConfigMapper {
  constructor(filePath) {
    this.filePath = filePath;
  }

  parseCSV() {
    return new Promise((resolve, reject) => {
      const csvData = [];

      const readStream = createReadStream(this.filePath);

      readStream.pipe(parse({ delimiter: ',', columns: true, skip_empty_lines: true }))
        .on('data', (row) => {
          csvData.push(row);
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          resolve(csvData);
        });
    });
  }
}
