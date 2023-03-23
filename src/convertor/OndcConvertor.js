import { run } from 'node-jq';

export default class OndcConvertor {
  constructor(inputJson) {
    this.inputJson = inputJson;
  }

  async convert() {
    const convertedOndcResponse = await Promise.all(
      this.inputJson.map(async (item) => {
        let ondcItemValue;
        if (item.ONDC.split('.').length > 1) {
          ondcItemValue = await run(`. | { ${item.ONDC.split('.')[0]}: { ${item.ONDC.split('.')[1]}: "${item['platform-value']}" | to${item['data-type-ONDC']} }}`, item, { input: 'json' });
        } else {
          ondcItemValue = await run(`. | { ${item.ONDC}: "${item['platform-value']}" | to${item['data-type-ONDC']} }`, item, { input: 'json' });
        }
        return JSON.parse(ondcItemValue);
      }),
    );
    return convertedOndcResponse;
  }
}
