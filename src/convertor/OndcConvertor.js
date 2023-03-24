import { run } from 'node-jq';

export default class OndcConvertor {
  constructor(ondcMatchedTagsJson) {
    this.ondcMatchedTagsJson = ondcMatchedTagsJson;
  }

  async convert() {
    const convertedOndcResponse = await Promise.all(
      this.ondcMatchedTagsJson.map(async (tag) => {
        let ondcTagJsonString;
        const dataTypeExpression = ((tag['data-type-ONDC'] === 'boolean' || tag['platform-value'] === '')
          ? '' : `| to${tag['data-type-ONDC']}`);
        const platformResponseFormatter = (tag['platform-value'].toString().includes('"')
          ? tag['platform-value'].replaceAll('"', '\\"') : tag['platform-value']);
        const platformResponseValue = (tag['data-type-ONDC'] === 'boolean' ? platformResponseFormatter : `"${platformResponseFormatter}"`);
        if (tag.ONDC.split('.').length > 1) {
          ondcTagJsonString = await run(
            `. | { ${tag.ONDC.split('.')[0]}: { ${tag.ONDC.split('.')[1]}: ${platformResponseValue} ${(dataTypeExpression)} }}`,
            tag,
            { input: 'json' },
          );
        } else {
          ondcTagJsonString = await run(
            `. | { ${tag.ONDC}: ${platformResponseValue} ${dataTypeExpression} }`,
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
