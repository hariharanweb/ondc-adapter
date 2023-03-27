import { run } from 'node-jq';

export default class OndcMapper {
  constructor(configMapper, inputPlatformResponseJson) {
    this.configMapper = configMapper;
    this.inputPlatformResponseJson = inputPlatformResponseJson;
  }

  async getMatchedTags() {
    const arrayPlatformResponseKeys = (this.inputPlatformResponseJson.map(
      (platformItem) => Object.keys(platformItem),
    ))[0];
    const platformResponseJson = this.inputPlatformResponseJson;
    // matching config tags with keys of response json
    const matchedOndcTags = await arrayPlatformResponseKeys.map((item) => this.configMapper.find((matchedItem) => matchedItem.Platform.includes(`.${item}`))).filter((matchedOndcTag) => matchedOndcTag !== undefined);
    // mapping values extracted from response with matched ondc tags
    const matchedOndcTagsWithPlatformValues = await Promise.all(
      matchedOndcTags.map(async (tag) => {
        const itemWithValue = tag;
        const platformValueString = (tag['data-type-ONDC'] === 'boolean' ? '' : `| to${tag['data-type-ONDC']}`);
        const platformValue = await run(
          `.[] | { value: ${tag.Platform} ${platformValueString} }`,
          platformResponseJson,
          { input: 'json' },
        );
        itemWithValue['platform-value'] = JSON.parse(platformValue).value;
        return itemWithValue;
      }),
    );
    return matchedOndcTagsWithPlatformValues;
  }
}
