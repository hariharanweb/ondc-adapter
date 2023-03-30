import jqUtility from '../utility/JqUtility';

export default class OndcConvertor {
  static generateOndcFilter(ondcMatchedTag, ondcDataType, platformTagValue) {
    // console.log(`ondcMatchedTag: ${JSON.stringify(ondcMatchedTag)}`);
    // console.log(`ondcDataType: ${ondcDataType}`);
    // console.log(`platformTagValue: ${platformTagValue}`);
    const ondcTagKeys = ondcMatchedTag.ondc.split('.');
    const ondcItemValue = `${platformTagValue} ${ondcDataType}`;
    const ondcFilter = `. | if ( ${ondcTagKeys.length} > 1) 
        then { ${ondcTagKeys[0]}: { ${ondcTagKeys[1]}: ${ondcItemValue} }}
        else { ${ondcTagKeys[0]} : ${ondcItemValue} } end`;
    // console.log(`ondcFilter: ${ondcFilter}`);
    return ondcFilter;
  }

  static async convert(ondcMatchedTags) {
    const convertedOndcResponse = await Promise.all(
      ondcMatchedTags.map(async (ondcMatchedTag) => {
        const ondcDataType = ((ondcMatchedTag.ondcDataType === 'boolean' || ondcMatchedTag.ondcDataType === '' || ondcMatchedTag.platformValue === '')
          ? '' : `| to${ondcMatchedTag.ondcDataType}`);
        // console.log(`ondcDataType: ${ondcDataType}`);

        const platformTagValue = ((ondcMatchedTag.ondcDataType === 'boolean' || ondcMatchedTag.ondcDataType === '')
          ? ondcMatchedTag.platformValue : `"${ondcMatchedTag.platformValue.toString().replace(/"/g, '\\"')}"`);

        const ondcFilter = OndcConvertor
          .generateOndcFilter(ondcMatchedTag, ondcDataType, platformTagValue);
        const inputJson = {};
        return jqUtility.format(
          ondcFilter,
          inputJson,
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
