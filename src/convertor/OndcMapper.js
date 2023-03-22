import { run } from 'node-jq';

export default class OndcMapper {
  constructor(configMapper, platformJson) {
    this.configMapper = configMapper;
    this.platformJson = platformJson;
  }

  async getMatchedTags() {
    const arrayPlatformResponseKeys = (this.platformJson.map(
      (platformItem) => Object.keys(platformItem),
    ))[0];
    const inputPlatformResponseJson = this.platformJson;
    // matching config tags with keys of response json
    const matchedOndcTags = await arrayPlatformResponseKeys.map((item) => this.configMapper.find((matchedItem) => matchedItem.Platform.includes(`.${item}`)));
    // mapping values extracted from response with matched ondc tags
    const matchedOndcTagsWithPlatformValues = await Promise.all(
      matchedOndcTags.map(async (item) => {
        const itemWithValue = item;
        const platformValue = await run(`.[] | { value: ${item.Platform} | to${item['data-type-ONDC']} }`, inputPlatformResponseJson, { input: 'json' });
        itemWithValue['platform-value'] = JSON.parse(platformValue).value;
        return itemWithValue;
      }),
    );
    return matchedOndcTagsWithPlatformValues;
  }
}
