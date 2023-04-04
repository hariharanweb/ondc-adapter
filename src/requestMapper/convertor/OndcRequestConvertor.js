import PlatformConfigMapper from '../../configuration/PlatformConfigMapper';
import ItemMapper from '../../convertor/ItemMapper';
import RequestConvertor from './RequestConvertor';

export default class OndcRequestConvertor {
  constructor(ondcResponseJson) {
    this.ondcResponseJson = ondcResponseJson;
  }

  async convert() {
    const csvparser = new PlatformConfigMapper('src/requestMapper/resources/requestMapper.csv');
    const csvDataJson = await csvparser.parseCSV();
    const itemMapper = new ItemMapper(csvDataJson);
    const platformMatchedValues = await itemMapper.map(this.ondcResponseJson);
    const platformResponse = await RequestConvertor.convert(platformMatchedValues);
    return platformResponse;
  }
}
