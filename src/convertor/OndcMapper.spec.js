import {
  it, expect, describe,
} from 'vitest';
import wcMapperConfig from '../resource/test/expectedMapperOutput.json';
import OndcMapper from './OndcMapper';
import expectedMatchedValueWithId from '../resource/test/ExpectedmatchedJsonWithId.json';
import wcResponseJSONWithID from '../resource/test/wcResponseWithID.json';
import wcResponseJSONWithName from '../resource/test/wcResponseWithName.json';
import expectedMatchedValueWithName from '../resource/test/ExpectedmatchedJsonWithName.json';
import wcResponseJSONWithNameAndID from '../resource/test/wcResponseWithNameAndID.json';
import expectedMatchedValueWithNameAndId from '../resource/test/ExpectedmatchedJsonWithNameAndId.json';
import wcResponseJSONWithParentItemId from '../resource/test/wcResponseWithParentItemId.json';
import expectedMatchedValueWithParentItemId from '../resource/test/ExpectedmatchedJsonWithParentItemId.json';
import wcResponseJSONWithNameIdAndParentId from '../resource/test/wcResponseWithNameIdAndParentId.json';
import expectedMatchedValueWithNameIdAndParentId from '../resource/test/ExpectedmatchedJsonWithNameIdAndParentId.json';

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
  it('should test if name and id values in matchedJson from wooCommmerce response ', async () => {
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithNameAndID);
    const matchedJsonWithNameAndIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithNameAndIdValue).toStrictEqual(expectedMatchedValueWithNameAndId);
  });
  it('should test if parent id value in matchedJson from wooCommmerce response ', async () => {
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithParentItemId);
    const matchedJsonWithParentIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithParentIdValue).toStrictEqual(expectedMatchedValueWithParentItemId);
  });
  it('should test if name, id and parent id values in matchedJson from wooCommmerce response ', async () => {
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithNameIdAndParentId);
    const matchedJsonWithNameIdAndParentIdValues = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithNameIdAndParentIdValues)
      .toStrictEqual(expectedMatchedValueWithNameIdAndParentId);
  });
});
