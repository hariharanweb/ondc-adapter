import {
  it, expect, describe,
} from 'vitest';
import OndcConvertor from './OndcConvertor';
import platformMapperConfig from '../resource/test/expectedMapperOutput.json';
import OndcMapper from './OndcMapper';

describe('OndcConvertor', () => {
  it('should convert platform item id to ondc item id ', async () => {
    const ondcMapper = new OndcMapper(
      platformMapperConfig,
      [
        {
          id: 52,
        },
      ],
    );
    const ondcMatchedTags = await ondcMapper.getMatchedTags();
    const ondcConvertor = new OndcConvertor(ondcMatchedTags);
    const convertedOndcResponse = await ondcConvertor.convert();
    expect(convertedOndcResponse).toStrictEqual(
      [
        {
          id: '52',
        },
      ],
    );
  });

  it('should convert platform item name to ondc item name', async () => {
    const ondcMapper = new OndcMapper(
      platformMapperConfig,
      [
        {
          name: 'XYZ',
        },
      ],
    );
    const ondcMatchedTags = await ondcMapper.getMatchedTags();
    const ondcConvertor = new OndcConvertor(ondcMatchedTags);
    const convertedOndcResponse = await ondcConvertor.convert();
    expect(convertedOndcResponse).toStrictEqual(
      [
        {
          descriptor: {
            name: 'XYZ',
          },
        },
      ],
    );
  });
});
