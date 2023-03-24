import { run } from 'node-jq';

export default class OndcConvertor {
  constructor(ondcMatchedTagsJson) {
    this.ondcMatchedTagsJson = ondcMatchedTagsJson;
  }

  async convert() {
    const convertedOndcResponse = await Promise.all(
      this.ondcMatchedTagsJson.map(async (tag) => {
        let ondcTagJsonString;
        if (tag.ONDC.split('.').length > 1) {
          ondcTagJsonString = await run(
            `. | { ${tag.ONDC.split('.')[0]}: { ${tag.ONDC.split('.')[1]}: "${tag['platform-value']}" | to${tag['data-type-ONDC']} }}`,
            tag,
            { input: 'json' },
          );
        } else {
          ondcTagJsonString = await run(
            `. | { ${tag.ONDC}: "${tag['platform-value']}" | to${tag['data-type-ONDC']} }`,
            tag,
            { input: 'json' },
          );
        }
        return JSON.parse(ondcTagJsonString);
      }),
    );
    let convertedOndcResponseMerged = {};
    const convertedOndcResponseItems = [];
    convertedOndcResponse.forEach((ondcTag) => {
      const ondcTagKey = Object.keys(ondcTag)[0];
      if (ondcTagKey in convertedOndcResponseMerged) {
        convertedOndcResponseMerged[ondcTagKey] = {
          ...convertedOndcResponseMerged[ondcTagKey],
          ...ondcTag[ondcTagKey],
        };
      } else {
        convertedOndcResponseMerged = { ...convertedOndcResponseMerged, ...ondcTag };
      }
    });
    convertedOndcResponseItems.push(convertedOndcResponseMerged);
    return convertedOndcResponseItems;
  }
}
