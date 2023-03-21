import {
  it, expect, describe,
} from 'vitest';
import PlatformConfigMapper from './PlatformConfigMapper';
import expectedMapperOutput from '../resource/test/expectedMapperOutput.json';

describe('PlatformConfigMapper', () => {
  it('should test if csv file is called ', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/wooCommerceTestConfig.csv');
    const csvData = await csvparser.parseCSV();
    expect(csvData).toHaveLength(3);
  });

  it('should test if csv file has been parsed to json result ', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/wooCommerceTestConfig.csv');
    const csvData = await csvparser.parseCSV();
    expect(csvData).toStrictEqual(expectedMapperOutput);
  });
});
