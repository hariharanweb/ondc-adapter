import jqUtility from '../../utility/JqUtility';
import LoggingService from '../../utility/LoggingService';

const logger = LoggingService.getLogger('RequestConvertor');

export default class RequestConvertor {
  static generatePlatformFilter(platformMatchedValue, platformDataType, ondcTagValue) {
    logger.debug(`platformMatchedValue: ${JSON.stringify(platformMatchedValue)}`);
    logger.debug(`platformDataType: ${platformDataType}`);
    logger.debug(`ondcTagValue: ${ondcTagValue}`);
    const platformTagKeys = platformMatchedValue.platform.split('.');
    const platformItemValue = `${ondcTagValue} ${platformDataType}`;
    const platformFilter = `. | if ( ${platformTagKeys.length} > 1) 
        then { ${platformTagKeys[0]}: { ${platformTagKeys[1]}: ${platformItemValue} }}
        else { ${platformTagKeys[0]} : ${platformItemValue} } end`;
    logger.debug(`platformFilter: ${platformFilter}`);
    return platformFilter;
  }

  static getPlatformDataType(platformMatchedValue) {
    const isDatatypeNotNeeded = (platformMatchedValue.platfromDataType === 'boolean'
    || platformMatchedValue.platfromDataType === ''
    || platformMatchedValue.platformValue === '');
    return isDatatypeNotNeeded ? '' : `| to${platformMatchedValue.platformDataType}`;
  }

  static getOndcTagValue(platformMatchedValue) {
    return ((platformMatchedValue.ondcDataType === 'boolean' || platformMatchedValue.ondcDataType === '')
      ? platformMatchedValue.platformValue : `"${platformMatchedValue.platformValue.toString().replace(/"/g, '\\"')}"`);
  }

  static generatePlatformResponse(platformResponseTags) {
    let mergedPlatformResponse = {};
    platformResponseTags.forEach((platformTag) => {
      const entries = Object.entries(platformTag);
      return entries.forEach(([key, val]) => {
        if (key in mergedPlatformResponse) {
          mergedPlatformResponse[key] = {
            ...mergedPlatformResponse[key],
            ...val,
          };
        } else {
          mergedPlatformResponse = { ...mergedPlatformResponse, ...platformTag };
        }
      });
    });
    return mergedPlatformResponse;
  }

  static generateOndcTag(platfromMatchedValue) {
    const platformDataType = RequestConvertor.getPlatformDataType(platfromMatchedValue);
    logger.debug(`platformDataType: ${platformDataType}`);

    const ondcTagValue = RequestConvertor.getOndcTagValue(platfromMatchedValue);

    const platformFilter = RequestConvertor
      .generatePlatformFilter(platfromMatchedValue, platformDataType, ondcTagValue);

    const inputJson = {};
    return jqUtility.format(
      platformFilter,
      inputJson,
    );
  }

  static async convert(platfromMatchedValues) {
    const platformResponseTags = await Promise.all(
      platfromMatchedValues.map(
        (platfromMatchedValue) => RequestConvertor.generateOndcTag(platfromMatchedValue),
      ),
    );
    return RequestConvertor.generatePlatformResponse(platformResponseTags);
  }
}
