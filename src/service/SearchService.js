import LoggingService from '../utility/LoggingService.js';
import PlatformSearch from '../convertor/PlatformSearch.js';
import PlatformOnSearchConvertor from '../convertor/PlatformOnSearchConvertor.js';

const logger = LoggingService.getLogger('PlatformSearchGenerator');

const search = async (data) => {
  logger.debug(`Search with data : ${data}`);
  try {
    const platformResponse = await PlatformSearch.getPlatformResponse(data);
    logger.debug(platformResponse);
    return await PlatformOnSearchConvertor
      .convertPlatformItemArrayToOndcItemArray(platformResponse);
  } catch (error) {
    logger.error(`Error Occurred for Search : ${error}`);
    return error;
  }
};
export default {
  search,
};
