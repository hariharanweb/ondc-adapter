import { run } from 'node-jq';

export default class OndcMapper {
  constructor(configMapper, wcResponseJson) {
    this.configMapper = configMapper;
    this.wcResponseJson = wcResponseJson;
  }

  getMatchedTags() {
    const arrayWcResponseKeys = this.wcResponseJson.map(
      (wcResponseItem) => Object.keys(wcResponseItem),
    );
    const matchedOndcTags = arrayWcResponseKeys.map((item) => this.configMapper.filter((match) => match['Woo-Commerce'].includes(`.${item}`)));
    return matchedOndcTags[0];
  }

  convert() {
    const inputWcResponseJson = this.wcResponseJson;
    const mappedResult = run('.[] | {id: .id | tostring }', inputWcResponseJson, { input: 'json' });
    return mappedResult;
  }
}
