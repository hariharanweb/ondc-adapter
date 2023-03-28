import { run } from 'node-jq';

export default class OndcConvertor {
  constructor(ondcMatchedTagsJson) {
    this.ondcMatchedTagsJson = ondcMatchedTagsJson;
  }

  async convert() {
    const convertedOndcResponse = await Promise.all(
      this.ondcMatchedTagsJson.map(async (tag) => {
        let ondcTagJsonString;
        const dataTypeExpression = ((tag.ondcDataType === 'boolean' || tag.platformValue === '')
          ? '' : `| to${tag.ondcDataType}`);
        const platformResponseFormatter = (tag.platformValue.toString().includes('"')

          ? tag.platformValue.replace(/"/g, '\\"') : tag.platformValue);
        const platformResponseValue = (tag.ondcDataType === 'boolean' ? platformResponseFormatter : `"${platformResponseFormatter}"`);
        if (tag.ondc.split('.').length > 1) {
          ondcTagJsonString = await run(
            `. | { ${tag.ondc.split('.')[0]}: { ${tag.ondc.split('.')[1]}: ${platformResponseValue} ${(dataTypeExpression)} }}`,
            tag,
            { input: 'json' },
          );
        } else {
          ondcTagJsonString = await run(
            `. | { ${tag.ondc}: ${platformResponseValue} ${dataTypeExpression} }`,
            tag,
            { input: 'json' },
          );
        }
        return JSON.parse(ondcTagJsonString);
      }),
    );
    let convertedOndcResponseMerged = {};
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
    return convertedOndcResponseMerged;
  }
}
