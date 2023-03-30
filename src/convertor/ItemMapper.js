import jqUtility from '../utility/JqUtility';

export default class ItemMapper {
  constructor(configs) {
    this.configs = configs;
  }

  async map(platformItem) {
    // console.log("platformItem: " + JSON.stringify(platformItem));
    this.configs = this.configs.filter((config) => config.platform !== '');
    return Promise.all(this.configs.map(async (config) => {
      const platformValueType = '| tostring';
      // console.log("platformValueType: " + platformValueType);
      const filterValue = `. | if (${config.platform} | tostring | length > 0) 
      then ${config.platform} ${platformValueType} else ${config.platform} end`;
      // console.log("Filter: " + filterValue);
      const platformValue = await jqUtility.format(filterValue, platformItem);
      return {
        ...config, platformValue,
      };
    }));
  }
}
