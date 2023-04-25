import LoggingService from '../utility/LoggingService.js';
import OndcSearchExtractor from './OndcSearchExtractor.js';
import ApiCaller from '../utility/ApiCaller.js';

const logger = LoggingService.getLogger('PlatformSearch');

export default class PlatformSearch {
  static getPlatformResponse(ondcRequest) {
    const ondcSearchJson = OndcSearchExtractor.extract(ondcRequest);
    const platformRequest = PlatformSearch.generateRequest(ondcSearchJson);
    return ApiCaller.makeHttpRequest(platformRequest);
  }

  static generateRequest(inputObject) {
    logger.debug(`Executing generateRequest ${inputObject}`);
    let urlString = '';
    if (inputObject.productName === '' && inputObject.productId === '' && inputObject.categoryId === '' && inputObject.categoryName === '') {
      urlString = 'https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04';
    } if (inputObject.productName !== '') {
      urlString = `https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&search=${inputObject.productName}`;
    } if (inputObject.productId !== '') {
      urlString = `https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products/${inputObject.productId}?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04`;
    } if (inputObject.categoryId !== '') {
      urlString = `https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&category=${inputObject.categoryId}`;
    } if (inputObject.categoryName !== '') {
      urlString = `https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products/categories?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&search=${inputObject.categoryName}`;
    }
    return {
      url: urlString,
      httpMethod: 'GET',
    };
  }
}
