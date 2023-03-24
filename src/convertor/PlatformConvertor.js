import PlatformConfigMapper from '../configuration/PlatformConfigMapper';
import OndcMapper from './OndcMapper';
import OndcConvertor from './OndcConvertor';

export default class PlatformConvertor {
  constructor(platformResponseJson) {
    this.platformResponseJson = platformResponseJson;
  }

  async convert() {
    const csvparser = new PlatformConfigMapper('src/resource/item_mapping_config.csv');
    const csvDataJson = await csvparser.parseCSV();
    const ondcMapper = new OndcMapper(csvDataJson, this.platformResponseJson);
    const ondcMatchedTags = await ondcMapper.getMatchedTags();
    const ondcConvertor = new OndcConvertor(ondcMatchedTags);
    const convertedOndcResponse = await ondcConvertor.convert();
    return convertedOndcResponse;
  }
}
