import { run } from 'node-jq';

export default class OndcItemMapper {
  constructor(configs) {
    this.configs = configs;
  }

  async map(platformItem) {
    //  `. | '${config.platform} == '' then ". | ${config.platform}" else ${platformValueString}'`,
    return Promise.all(this.configs.map(async (config) => {
      const platformValueString = (config.ondcDataType === 'boolean' ? '' : `| to${config.ondcDataType}`);
      const platformValue = await run(
        `. | ${config.platform} ${platformValueString}`,
        platformItem,
        { input: 'json' },
      );
      return {
        ...config, platformValue: JSON.parse(platformValue),
      };
    }));
  }
}
