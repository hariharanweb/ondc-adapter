import ConfigReader from './Configuration/ConfigReader.js';

const OndcAdapter = async () => {
  const readerResponse = new ConfigReader('./src/item_mapping_config.csv');
  await readerResponse.csvReader();
  // const response =
  readerResponse.getConfig();
  // console.log(response);
};

OndcAdapter();
