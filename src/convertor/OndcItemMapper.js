import { run } from 'node-jq';

export default class OndcItemMapper {
  constructor(configs) {
    this.configs = configs;
  }

  async map(platformItem) {
    this.configs = this.configs.filter((config) => config.platform !== '');
    return Promise.all(this.configs.map(async (config) => {
      const platformValueString = (config.ondcDataType === 'boolean' ? '' : `| to${config.ondcDataType}`);
      const platformValue = await run(
        `. | if (${config.platform} | tostring | length > 0) then ${config.platform} ${platformValueString} else ${config.platform} end`,
        platformItem,
        { input: 'json' },
      );
      return {
        ...config, platformValue: JSON.parse(platformValue),
      };
    }));
  }
}
