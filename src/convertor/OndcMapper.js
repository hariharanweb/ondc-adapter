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
    const matchedOndcTags = await arrayWcResponseKeys.map((item) => this.configMapper.find((matchedItem) => matchedItem['Woo-Commerce'].includes(`.${item}`)));
    const matchedOndcTagsWithWooCommerceValues = await Promise.all(
      matchedOndcTags.map(async (item) => {
        const itemWithValue = item;
        const wooCommerceValue = await run(`.[] | { value: ${item['Woo-Commerce']} | to${item['data-type-ONDC']} }`, inputWcResponseJson, { input: 'json', output: 'compact' });
        itemWithValue['woo-commerce-value'] = JSON.parse(wooCommerceValue).value;
        return itemWithValue;
      }),
    );
    return matchedOndcTagsWithWooCommerceValues;
  }
}
