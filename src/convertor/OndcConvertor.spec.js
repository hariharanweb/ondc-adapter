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
  it('should convert platform items to ondc items', async () => {
    const ondcMapper = new OndcMapper(
      platformMapperConfig,
      [
        {
          id: 52,
          name: 'XYZ',
          parent_id: 13,
          images: [{
            src: 'xyz.png',
          }],
          categories: [
            {
              id: 20,
            },
          ],
        },
      ],
    );
    const ondcMatchedTags = await ondcMapper.getMatchedTags();
    const ondcConvertor = new OndcConvertor(ondcMatchedTags);
    const convertedOndcResponse = await ondcConvertor.convert();
    expect(convertedOndcResponse)
      .toStrictEqual(
        [
          {
            id: '52',
            descriptor: {
              name: 'XYZ',
              images: 'xyz.png',
            },
            parent_item_id: '13',
            category_id: '20',
          },
        ],
      );
  });
});
