import PlatformConfigMapper from '../configuration/PlatformConfigMapper.js';
import ItemMapper from './ItemMapper.js';
import OndcResponseConvertor from './OndcResponseConvertor.js';
import LoggingService from '../utility/LoggingService.js';

const logger = LoggingService.getLogger('PlatformOnSearchConvertor');

export default class PlatformOnSearchConvertor {
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
    const ondcResponse = await OndcResponseConvertor.convert(ondcMatchedValues);
    logger.info(`Ondc Response: ${JSON.stringify(ondcResponse)}`);
    return ondcResponse;
  }
}
