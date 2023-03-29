import PlatformFormatter from '../formatter/PlatformFormatter';

export default class OndcItemMapper {
  constructor(configs) {
    this.configs = configs;
  }

  async map(platformItem) {
    this.configs = this.configs.filter((config) => config.platform !== '');
    return Promise.all(this.configs.map(async (config) => {
      const platformValueType = (config.ondcDataType === 'boolean' ? '' : `| to${config.ondcDataType}`);
      const platformValue = await PlatformFormatter.format(`. | if (${config.platform} | tostring | length > 0) then ${config.platform} ${platformValueType} else ${config.platform} end`, platformItem);
      return {
        ...config, platformValue,
      };
    }));
  }
}
