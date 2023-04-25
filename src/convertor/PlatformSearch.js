import LoggingService from '../utility/LoggingService.js';
import OndcSearchExtractor from './OndcSearchExtractor.js';
import ApiCaller from '../utility/ApiCaller.js';

const logger = LoggingService.getLogger('PlatformSearch');

export default class PlatformSearch {
  static async getPlatformResponse(ondcRequest) {
    const ondcSearchJson = OndcSearchExtractor.extract(ondcRequest);
    const platformRequest = PlatformSearch.generateRequest(ondcSearchJson);
    let platformResponse = await ApiCaller.makeHttpRequest(platformRequest);
    // Update it as array even when response is in Object format
    platformResponse = JSON.parse(platformResponse);
    if (!Array.isArray(platformResponse)) {
      platformResponse = [platformResponse];
    }
    return platformResponse;
  }

  static generateRequest(inputObject) {
    logger.debug(`Executing generateRequest ${inputObject}`);
    let urlString = '';
    if (inputObject.productName === '' && inputObject.productId === '' && inputObject.categoryId === '' && inputObject.categoryName === '') {
      urlString = `${process.env.PLATFORM_BASE_URL}${process.env.PLATFORM_AUTH_QUERY_PARAM}`;
    } if (inputObject.productName !== '') {
      urlString = `${process.env.PLATFORM_BASE_URL}${process.env.PLATFORM_AUTH_QUERY_PARAM}&search=${inputObject.productName}`;
    } if (inputObject.productId !== '') {
      urlString = `${process.env.PLATFORM_BASE_URL}/${inputObject.productId}${process.env.PLATFORM_AUTH_QUERY_PARAM}`;
    } if (inputObject.categoryId !== '') {
      urlString = `${process.env.PLATFORM_BASE_URL}${process.env.PLATFORM_AUTH_QUERY_PARAM}&category=${inputObject.categoryId}`;
    } if (inputObject.categoryName !== '') {
      urlString = `${process.env.PLATFORM_BASE_URL}/categories${process.env.PLATFORM_AUTH_QUERY_PARAM}&search=${inputObject.categoryName}`;
    }
    return {
      url: urlString,
      httpMethod: 'GET',
    };
  }
}
