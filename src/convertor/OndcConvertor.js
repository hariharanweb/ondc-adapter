import PlatformFormatter from '../formatter/PlatformFormatter';

export default class OndcConvertor {
  static async convert(ondcMappedTags) {
    const convertedOndcResponse = await Promise.all(
      ondcMappedTags.map(async (tag) => {
        const ondcValueType = ((tag.ondcDataType === 'boolean' || tag.platformValue === '')
          ? '' : `| to${tag.ondcDataType}`);
        const platformResponseValue = (tag.ondcDataType === 'boolean'
          ? tag.platformValue : `"${tag.platformValue.toString().replace(/"/g, '\\"')}"`);
        const ondcTagKeys = tag.ondc.split('.');
        const ondcItemValue = `${platformResponseValue} ${ondcValueType}`;
        const ondcFilter = `. | if ( ${ondcTagKeys.length} > 1) 
        then { ${ondcTagKeys[0]}: { ${ondcTagKeys[1]}: ${ondcItemValue} }}
        else { ${ondcTagKeys[0]} : ${ondcItemValue} } end`;
        return PlatformFormatter.format(
          ondcFilter,
          tag,
        );
      }),
    );
    let mergedOndcResponse = {};
    convertedOndcResponse.forEach((ondcTag) => {
      const entries = Object.entries(ondcTag);
      return entries.forEach(([key, val]) => {
        if (key in mergedOndcResponse) {
          mergedOndcResponse[key] = {
            ...mergedOndcResponse[key],
            ...val,
          };
        } else {
          mergedOndcResponse = { ...mergedOndcResponse, ...ondcTag };
        }
      });
    });
    return mergedOndcResponse;
  }
}
