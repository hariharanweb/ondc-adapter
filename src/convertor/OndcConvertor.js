import jqUtility from '../utility/JqUtility';
import LoggingService from '../utility/LoggingService';

const logger = LoggingService.getLogger('OndcConvertor');

export default class OndcConvertor {
  static generateOndcFilter(ondcMatchedTag, ondcDataType, platformTagValue) {
    logger.debug(`ondcMatchedTag: ${JSON.stringify(ondcMatchedTag)}`);
    logger.debug(`ondcDataType: ${ondcDataType}`);
    logger.debug(`platformTagValue: ${platformTagValue}`);
    const ondcTagKeys = ondcMatchedTag.ondc.split('.');
    const ondcItemValue = `${platformTagValue} ${ondcDataType}`;
    const ondcFilter = `. | if ( ${ondcTagKeys.length} > 1) 
        then { ${ondcTagKeys[0]}: { ${ondcTagKeys[1]}: ${ondcItemValue} }}
        else { ${ondcTagKeys[0]} : ${ondcItemValue} } end`;
    logger.debug(`ondcFilter: ${ondcFilter}`);
    return ondcFilter;
  }

  static generateOndcDataType(ondcMatchedTag) {
    return ((ondcMatchedTag.ondcDataType === 'boolean' || ondcMatchedTag.ondcDataType === '' || ondcMatchedTag.platformValue === '')
      ? '' : `| to${ondcMatchedTag.ondcDataType}`);
  }

  static generatePlatformTagValue(ondcMatchedTag) {
    return ((ondcMatchedTag.ondcDataType === 'boolean' || ondcMatchedTag.ondcDataType === '')
      ? ondcMatchedTag.platformValue : `"${ondcMatchedTag.platformValue.toString().replace(/"/g, '\\"')}"`);
  }

  static generateOndcResponse(convertedOndcResponse) {
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

  static async convert(ondcMatchedTags) {
    const convertedOndcResponse = await Promise.all(
      ondcMatchedTags.map((ondcMatchedTag) => {
        const ondcDataType = OndcConvertor.generateOndcDataType(ondcMatchedTag);
        logger.debug(`ondcDataType: ${ondcDataType}`);

        const platformTagValue = OndcConvertor.generatePlatformTagValue(ondcMatchedTag);

        const ondcFilter = OndcConvertor
          .generateOndcFilter(ondcMatchedTag, ondcDataType, platformTagValue);

        const inputJson = {};
        return jqUtility.format(
          ondcFilter,
          inputJson,
        );
      }),
    );

    return OndcConvertor.generateOndcResponse(convertedOndcResponse);
  }
}
