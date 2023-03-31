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
    const ondcMatchedValues = await itemMapper.map(this.platformResponseJson);
    logger.debug(`ondcMatchedValues: ${JSON.stringify(ondcMatchedValues)}`);
    const ondcResponse = await OndcConvertor.convert(ondcMatchedValues);
    logger.info(`Ondc Response: ${JSON.stringify(ondcResponse)}`);
    return ondcResponse;
  }
}
