import { run } from 'node-jq';

export default class PlatformFormatter {
  static async format(filter, inputJson) {
    return JSON.parse(await run(
      filter,
      inputJson,
      { input: 'json' },
    ));
  }
}
