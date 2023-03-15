import fs from "fs";
import { parse } from "csv-parse";

class CsvReader {
    constructor(filename) {
        this.filename = filename;
        this.mapResponse = new Map();
     }

    getMappedResponse = () => {
        return this.mapResponse;
    }

    fileParser = async ()=>{
        await this.csvToMapConverter(this.filename)
          .then((config) => {
            this.mapResponse = config;
          })
          .catch((err) => {
            return err;
          });
        } 

    csvToMapConverter = async(file) => {
        return await new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err) => {
              if (err) {
                reject(err);
              } else {
                let itemMapper=new Map();
                fs.createReadStream(file, 'utf8').pipe(parse({ delimiter: ",", from_line: 2 }))
                    .on("data", function (csvRow) {
                        itemMapper.set(csvRow[0], csvRow[2]);
                    })
                    .on("error", function (error) {
                        reject(error);
                    })
                    .on("end", function () {
                        resolve(itemMapper);
                    });
              }
            });
          });
    }
}

export default CsvReader;