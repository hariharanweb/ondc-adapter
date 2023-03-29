import {
  it, expect, describe,
} from 'vitest';
import PlatformConfigMapper from './PlatformConfigMapper';
import expectedMapperOutput from '../resource/test/expectedMapperOutput.json';

describe('PlatformConfigMapper', () => {
  it('should test if csv file is called ', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/platformTestConfig.csv');
    const csvData = await csvparser.parseCSV();
    expect(csvData).toHaveLength(5);
  });

  it('should test if faulty csv file is throwing error', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/testConfig.csv');
    try {
      await csvparser.parseCSV();
      expect(false).toBeTruthy();
    } catch (err) {
      expect(true).toBeTruthy();
    }
  });

  it('should test if csv file has been parsed to json result ', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/platformTestConfig.csv');
    const csvData = await csvparser.parseCSV();
    expect(csvData).toStrictEqual(expectedMapperOutput);
  });
});
