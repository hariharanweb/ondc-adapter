import PlatformConfigMapper from '../configuration/PlatformConfigMapper';
import OndcItemMapper from './OndcItemMapper';
import OndcConvertor from './OndcConvertor';

export default class PlatformConvertor {
  constructor(platformResponseJson) {
    this.platformResponseJson = platformResponseJson;
  }

  async convert() {
    const csvparser = new PlatformConfigMapper('src/resource/item_mapping_config.csv');
    const csvDataJson = await csvparser.parseCSV();
    const ondcMapper = new OndcItemMapper(csvDataJson);
    const ondcMatchedTags = await ondcMapper.map(this.platformResponseJson);
    const convertedOndcResponse = await OndcConvertor.convert(ondcMatchedTags);
    return convertedOndcResponse;
  }
}
