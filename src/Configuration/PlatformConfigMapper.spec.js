import {
  it, expect, describe, assert,
} from 'vitest';
import PlatformConfigMapper from './PlatformConfigMapper';

describe('PlatformConfigMapper', () => {
  it('should test if csv file is called ', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/item_mapping_config.csv');
    await csvparser.parseCSV()
      .then((csvData) => {
        expect(csvData.length).toBe(3);
      })
      .catch(() => {
        assert.fail();
      });
  });

//   it('should test if response file is same as output ', () => {
//     const platformConfigMapper = new PlatformConfigMapper();
//     const res = platformConfigMapper.csvToConfigurationJson("src/Configuration/item_mapping.csv")
//     expect(res).toBe(2);
//   });
});
