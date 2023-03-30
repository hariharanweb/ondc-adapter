import PlatformConfigMapper from '../configuration/PlatformConfigMapper';
import ItemMapper from './ItemMapper';
import OndcConvertor from './OndcConvertor';

export default class PlatformConvertor {
  constructor(platformResponseJson) {
    this.platformResponseJson = platformResponseJson;
  }

  async convert() {
    const csvparser = new PlatformConfigMapper('src/resource/item_mapping_config.csv');
    const csvDataJson = await csvparser.parseCSV();
    const itemMapper = new ItemMapper(csvDataJson);
    // will get the maching tag values , inputJSON, tagTobeFetched ,
    const ondcMatchedTags = await itemMapper.map(this.platformResponseJson);
    // console.log(`ondcMatchedTags: ${JSON.stringify(ondcMatchedTags)}`);
    const convertedOndcResponse = await OndcConvertor.convert(ondcMatchedTags);
    // console.log(`convertedOndcResponse: ${JSON.stringify(convertedOndcResponse)}`);
    return convertedOndcResponse;
  }
}
