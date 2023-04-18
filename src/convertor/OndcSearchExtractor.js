import LoggingService from '../utility/LoggingService';

const logger = LoggingService.getLogger('OndcConvertor');

export default class OndcSearchExtractor {
  static extract(ondcSearchRequest) {
    const { message } = ondcSearchRequest;
    logger.info('Extract method called');
    logger.debug(`ondcSearchRequest: ${JSON.stringify(ondcSearchRequest)}`);

    const categoryId = message.intent.category?.id ?? '';
    logger.debug(`category: ${categoryId}`);

    const categoryName = message.intent.category?.descriptor?.name ?? '';
    logger.debug(`productId: ${categoryName}`);

    const productName = message.intent.item?.descriptor?.name ?? '';
    logger.debug(`productName: ${productName}`);

    const productId = message.intent.item?.id ?? '';
    logger.debug(`productId: ${productId}`);

    return {
      productName, categoryId, productId, categoryName,
    };
  }
}
