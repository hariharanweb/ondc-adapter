import {
  it, expect, describe,
} from 'vitest';
import wcMapperConfig from '../resource/test/expectedMapperOutput.json';
import OndcMapper from './OndcMapper';
// import expectedResponseWithId from '../resource/test/expectedResponseWithId.json';
import expectedMatchedValueWithId from '../resource/test/ExpectedmatchedJsonWithId.json';
import wcResponseJSONWithID from '../resource/test/wcResponseWithID.json';
import wcResponseJSONWithName from '../resource/test/wcResponseWithName.json';
import expectedMatchedValueWithName from '../resource/test/ExpectedmatchedJsonWithName.json';
// import wcResponseJSONWithNameAndID from '../resource/test/wcResponseWithNameAndID.json';

describe('OndcMapper', () => {
  it('should test if id value in matchedJson from wooCommmerce response ', async () => {
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithID);
    const matchedJsonWithIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithIdValue).toStrictEqual(expectedMatchedValueWithId);
  });
  it('should test if name value in matchedJson from wooCommmerce response ', async () => {
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithName);
    const matchedJsonWithNameValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithNameValue).toStrictEqual(expectedMatchedValueWithName);
  });
  // it('should test if name and id values in matchedJson from wooCommmerce response ',
  // async () => {
  //   const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithNameAndID);
  //   const matchedJsonWithNameValue = await ondcMapper.getMatchedTags();
  //   expect(matchedJsonWithNameValue).toStrictEqual(expectedMatchedValueWithName);
  // });
  /*
  it('should test if ondc id is mapped with platform id ', async () => {
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithID);
    const mappedOndcResponseJson = await ondcMapper.convert();
    expect(JSON.parse(mappedOndcResponseJson)).toStrictEqual(expectedResponseWithId);
  });
  */
});
