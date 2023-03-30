import PlatformConfigMapper from '../configuration/PlatformConfigMapper';
import ItemMapper from './ItemMapper';
import OndcConvertor from './OndcConvertor';
import LoggingService from '../utility/LoggingService';

const logger = LoggingService.getLogger('PlatformConvertor');

export default class PlatformConvertor {
  constructor(platformResponseJson) {
    this.platformResponseJson = platformResponseJson;
  }

  async convert() {
    logger.info(`PlatformResponseJson:  + ${this.platformResponseJson}`);
    const csvparser = new PlatformConfigMapper('src/resource/item_mapping_config.csv');
    const csvDataJson = await csvparser.parseCSV();
    const itemMapper = new ItemMapper(csvDataJson);
    const ondcMatchedTags = await itemMapper.map(this.platformResponseJson);
    logger.debug(`ondcMatchedTags: ${JSON.stringify(ondcMatchedTags)}`);
    const ondcResponse = await OndcConvertor.convert(ondcMatchedTags);
    logger.info(`Ondc Response: ${JSON.stringify(ondcResponse)}`);
    return ondcResponse;
  }
}
