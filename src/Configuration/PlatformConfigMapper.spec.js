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
});
