// import SearchService from '../services/SearchService';
import OndcSearchExtractor from '../convertor/OndcSearchExtractor.js';
import PlatformOnSearchConvertor from '../convertor/PlatformOnSearchConvertor.js';
import PlatformSearchGenerator from '../convertor/PlatformSearchGenerator.js';
import ApiCaller from '../utility/ApiCaller.js';

const search = async (req, res) => {
  const data = req.body;
  const ondcSearchJson = OndcSearchExtractor.extract(data);
  const url = PlatformSearchGenerator.generateUrl(ondcSearchJson);
  const platformRequest = {
    url,
    httpMethod: 'GET',
  };
  try {
    const platformResponse = await ApiCaller.makeHttpRequest(platformRequest);
    // handle successful response here
    console.log(platformResponse);
    const ondcResponse = [];

    await Promise.all(JSON.parse(platformResponse).map(async (platformResponseItem) => {
      const platformConvertor = new PlatformOnSearchConvertor(platformResponseItem);
      const ondcResponseItem = await platformConvertor.convert();
      ondcResponse.push(ondcResponseItem);
    }));

    res.send(ondcResponse);
  } catch (error) {
    // handle error here
    console.error(error);
    res.send(error);
  }
};
export default {
  search,
};
