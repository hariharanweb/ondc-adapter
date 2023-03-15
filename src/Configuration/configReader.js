import CsvReader from "./CsvReader.js";

const configReader = async() => {
    let data = new CsvReader("../item_mapping_config.csv");
    await data.fileParser();
    let mapResponse = data.getMappedResponse();
    console.log(mapResponse);
}

configReader();