import {
  it, expect, describe,
} from 'vitest';
import PlatformConfigMapper from './PlatformConfigMapper';

describe('PlatformConfigMapper', () => {
  it('should test if csv file is called ', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/sample.csv');
    const csvData = await csvparser.parseCSV();
    expect(csvData.length).toBe(3);
  });
});
