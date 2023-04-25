import LoggingService from '../utility/LoggingService.js';
import SearchService from '../service/SearchService.js';

const logger = LoggingService.getLogger('SearchController');

const search = async (req, res) => {
  const data = req.body;
  logger.debug(`Inside Search : ${data}`);
  const response = await SearchService.search(data);
  res.send(response);
};
export default {
  search,
};
