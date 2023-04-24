import jqUtility from '../utility/JqUtility.js';
import LoggingService from '../utility/LoggingService.js';

const logger = LoggingService.getLogger('ItemMapper');

export default class ItemMapper {
  constructor(configs) {
    this.configs = configs;
  }

  static async getMatchedTagObject(config, platformItem) {
    const platformValueType = '| tostring';
    logger.debug(`platformValueType: ${platformValueType}`);
    const filterValue = `. | if (${config.platform} | tostring | length > 0) 
      then ${config.platform} ${platformValueType} else ${config.platform} end`;
    logger.debug(`Filter: ${filterValue}`);
    const platformValue = await jqUtility.format(filterValue, platformItem);
    return {
      ...config, platformValue,
    };
  }

  async map(platformItem) {
    logger.debug(`platformItem: ${JSON.stringify(platformItem)}`);
    this.configs = this.configs.filter((config) => config.platform !== '');
    return Promise.all(this
      .configs.map((config) => ItemMapper.getMatchedTagObject(config, platformItem)));
  }
}
