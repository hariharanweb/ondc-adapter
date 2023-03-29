import PlatformFormatter from '../formatter/PlatformFormatter';

export default class OndcConvertor {
  static async convert(ondcMappedTags) {
    const convertedOndcResponse = await Promise.all(
      ondcMappedTags.map(async (tag) => {
        let ondcMappedResponse;
        const ondcValueType = ((tag.ondcDataType === 'boolean' || tag.platformValue === '')
          ? '' : `| to${tag.ondcDataType}`);
        const platformResponseFormatter = (tag.platformValue.toString().includes('"')
          ? tag.platformValue.replace(/"/g, '\\"') : tag.platformValue);
        const platformResponseValue = (tag.ondcDataType === 'boolean' ? platformResponseFormatter : `"${platformResponseFormatter}"`);

        if (tag.ondc.split('.').length > 1) {
          ondcMappedResponse = await PlatformFormatter.format(
            `. | { ${tag.ondc.split('.')[0]}: { ${tag.ondc.split('.')[1]}: ${platformResponseValue} ${(ondcValueType)} }}`,
            tag,
          );
        } else {
          ondcMappedResponse = await PlatformFormatter.format(
            `. | { ${tag.ondc}: ${platformResponseValue} ${ondcValueType} }`,
            tag,
          );
        }
        return ondcMappedResponse;
      }),
    );
    let mergedOndcResponse = {};
    convertedOndcResponse.forEach((ondcTag) => {
      const ondcTagKey = Object.keys(ondcTag)[0];
      if (ondcTagKey in mergedOndcResponse) {
        mergedOndcResponse[ondcTagKey] = {
          ...mergedOndcResponse[ondcTagKey],
          ...ondcTag[ondcTagKey],
        };
      } else {
        mergedOndcResponse = { ...mergedOndcResponse, ...ondcTag };
      }
    });
    return mergedOndcResponse;
  }
}
