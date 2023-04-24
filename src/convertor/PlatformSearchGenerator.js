// import LoggingService from '../utility/LoggingService.js';

// const logger = LoggingService.getLogger('PlatformSearchConvertor');

export default class PlatformSearchGenerator {
  static generateUrl(inputObject) {
    if (inputObject.productName === '' && inputObject.productId === '' && inputObject.categoryId === '' && inputObject.categoryName === '') {
      return 'https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04';
    } if (inputObject.productName !== '') {
      return `https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&search=${inputObject.productName}`;
    } if (inputObject.productId !== '') {
      return `https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products/${inputObject.productId}?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04`;
    } if (inputObject.categoryId !== '') {
      return `https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&category=${inputObject.categoryId}`;
    } if (inputObject.categoryName !== '') {
      return `https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products/categories?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&search=${inputObject.categoryName}`;
    }
    return '';
  }
}
