import jqUtility from '../utility/JqUtility';
import LoggingService from '../utility/LoggingService';

const logger = LoggingService.getLogger('OndcConvertor');

export default class OndcConvertor {
  static generateOndcFilter(ondcMatchedValue, ondcDataType, platformTagValue) {
    logger.debug(`ondcMatchedValue: ${JSON.stringify(ondcMatchedValue)}`);
    logger.debug(`ondcDataType: ${ondcDataType}`);
    logger.debug(`platformTagValue: ${platformTagValue}`);
    const ondcTagKeys = ondcMatchedValue.ondc.split('.');
    const ondcItemValue = `${platformTagValue} ${ondcDataType}`;
    const ondcFilter = `. | if ( ${ondcTagKeys.length} > 1) 
        then { ${ondcTagKeys[0]}: { ${ondcTagKeys[1]}: ${ondcItemValue} }}
        else { ${ondcTagKeys[0]} : ${ondcItemValue} } end`;
    logger.debug(`ondcFilter: ${ondcFilter}`);
    return ondcFilter;
  }

  static generateOndcDataType(ondcMatchedValue) {
    return ((ondcMatchedValue.ondcDataType === 'boolean' || ondcMatchedValue.ondcDataType === '' || ondcMatchedValue.platformValue === '')
      ? '' : `| to${ondcMatchedValue.ondcDataType}`);
  }

  static generatePlatformTagValue(ondcMatchedValue) {
    return ((ondcMatchedValue.ondcDataType === 'boolean' || ondcMatchedValue.ondcDataType === '')
      ? ondcMatchedValue.platformValue : `"${ondcMatchedValue.platformValue.toString().replace(/"/g, '\\"')}"`);
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

  static async convert(ondcMatchedValues) {
    const convertedOndcResponse = await Promise.all(
      ondcMatchedValues.map((ondcMatchedValue) => {
        const ondcDataType = OndcConvertor.generateOndcDataType(ondcMatchedValue);
        logger.debug(`ondcDataType: ${ondcDataType}`);

        const platformTagValue = OndcConvertor.generatePlatformTagValue(ondcMatchedValue);

        const ondcFilter = OndcConvertor
          .generateOndcFilter(ondcMatchedValue, ondcDataType, platformTagValue);

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
