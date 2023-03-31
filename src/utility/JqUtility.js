import { run } from 'node-jq';

export default class JqUtility {
  static async format(filter, inputJson) {
    const res = await run(
      filter,
      inputJson,
      { input: 'json' },
    );
    const ans = JSON.parse(res);
    return ans;
  }
}
