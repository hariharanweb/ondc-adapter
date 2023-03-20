import {
  it, expect, describe,
} from 'vitest';
import PlatformConfigMapper from './PlatformConfigMapper';
import sample from '../resource/test/sample.json';

describe('PlatformConfigMapper', () => {
  it('should test if csv file is called ', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/sample.csv');
    const csvData = await csvparser.parseCSV();
    expect(csvData).toHaveLength(3);
  });

  it('should test if csv file has been parsed to json result ', async () => {
    const csvparser = new PlatformConfigMapper('src/resource/test/sample.csv');
    const csvData = await csvparser.parseCSV();
    expect(csvData).toStrictEqual(sample);
  });
});
