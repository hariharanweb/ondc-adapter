import { run } from 'node-jq';

export default class OndcMapper {
  constructor(configMapper, wcResponseJson) {
    this.configMapper = configMapper;
    this.wcResponseJson = wcResponseJson;
  }

  async getMatchedTags() {
    const arrayWcResponseKeys = (this.wcResponseJson.map(
      (wcResponseItem) => Object.keys(wcResponseItem),
    ))[0];
    const inputWcResponseJson = this.wcResponseJson;
    let matchedOndcTags = await arrayWcResponseKeys.map((item) => this.configMapper.find((matchedItem) => matchedItem['Woo-Commerce'].includes(`.${item}`)));
    const wooCommerceIdvalue = await run(`.[] | { value: ${matchedOndcTags[0]['Woo-Commerce']} | tostring}`, inputWcResponseJson, { input: 'json', output: 'compact' });
    matchedOndcTags = matchedOndcTags.map((objItem) => ({ ...objItem, 'woo-commerce-value': JSON.parse(wooCommerceIdvalue).value }));
    return matchedOndcTags;
  }

  convert() {
    const inputWcResponseJson = this.wcResponseJson;
    const mappedResult = run('.[] | {id: .id | tostring }', inputWcResponseJson, { input: 'json' });
    return mappedResult;
  }
}
