import {
  it, expect, describe,
} from 'vitest';
import wcMapperConfig from '../resource/test/expectedMapperOutput.json';
import OndcMapper from './OndcMapper';
import expectedResponseWithId from '../resource/test/expectedResponseWithId.json';
import expectedTempCreatorJson from '../resource/test/wcResponseWithIDandValue.json';
import wcResponseJSONWithID from '../resource/test/wcResponseWithID.json';

describe('OndcMapper', () => {
  it('should test if id is present in wooCommmerce resonse ', async () => {
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithID);
    const tempCreatorJson = ondcMapper.getMatchedTags();

    expect(tempCreatorJson).toStrictEqual(expectedTempCreatorJson);
  });

  it('should test if ondc id is mapped with platform id ', async () => {
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithID);
    const mappedOndcResponseJson = await ondcMapper.convert();
    expect(JSON.parse(mappedOndcResponseJson)).toStrictEqual(expectedResponseWithId);
  });
});
