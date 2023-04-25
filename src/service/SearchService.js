import LoggingService from '../utility/LoggingService.js';
import PlatformSearch from '../convertor/PlatformSearch.js';
import PlatformOnSearchConvertor from '../convertor/PlatformOnSearchConvertor.js';

const logger = LoggingService.getLogger('PlatformSearchGenerator');

const generateOndcResponseFromItems = (items) => ({
  context:
      {
        domain: 'nic2004:52110',
        country: 'IND',
        city: 'std:011',
        action: 'on_search',
        core_version: '1.1.0',
        bap_id: 'buyerapp.com',
        bap_uri: 'https://buyerapp.com/ondc',
        bpp_id: 'sellerapp.com',
        bpp_uri: 'https://sellerapp.com/ondc',
        transaction_id: '9fdb667c-76c6-456a-9742-ba9caa5eb765',
        message_id: '1655281254860',
        timestamp: '2023-02-03T08:00:30.000Z',
      },
  message:
      {
        catalog: {
          'bpp/providers': [
            {
              items,
            },
          ],
        },

      },
});
const search = async (data) => {
  logger.debug(`Search with data : ${data}`);
  try {
    const platformResponse = await PlatformSearch.getPlatformResponse(data);
    logger.debug(platformResponse);
    const items = await PlatformOnSearchConvertor
      .convertPlatformItemArrayToOndcItemArray(platformResponse);
    return generateOndcResponseFromItems(items);
  } catch (error) {
    logger.error(`Error Occurred for Search : ${error}`);
    return error;
  }
};

export default {
  search,
};
