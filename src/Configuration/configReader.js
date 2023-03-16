import CsvReader from './CsvReader.js';

class ConfigReader {
  constructor(filename) {
    this.filename = filename;
    this.configResponse = new Map();
  }

  getConfig() {
    return this.configResponse;
  }

  async csvReader() {
    const data = new CsvReader(this.filename);
    await data.fileParser();
    this.configResponse = data.getMappedResponse();
  }
}

export default ConfigReader;
