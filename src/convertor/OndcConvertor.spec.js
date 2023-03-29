import {
  it, expect, describe,
} from 'vitest';
import OndcConvertor from './OndcConvertor';
import platformMapperConfig from '../resource/test/expectedMapperOutput.json';
import OndcItemMapper from './OndcItemMapper';

describe('OndcConvertor', () => {
  it('should convert platform item id to ondc item id ', async () => {
    const config = [
      {
        ondc: 'id',
        ondcDataType: 'string',
        platform: '.id',
        platformDataType: 'number',
      }];
    const ondcMapper = new OndcItemMapper(config);
    const ondcMatchedTags = await ondcMapper.map({
      id: 52,
    });
    const ondcConvertor = new OndcConvertor(ondcMatchedTags);
    const convertedOndcResponse = await ondcConvertor.convert();
    expect(convertedOndcResponse).toStrictEqual(
      {
        id: '52',
      },
    );
  });

  it('should convert platform item name to ondc item name ', async () => {
    const config = [{
      ondc: 'descriptor.name',
      ondcDataType: 'string',
      platform: '.name',
      platformDataType: 'string',
    }];
    const ondcMapper = new OndcItemMapper(
      config,
    );
    const ondcMatchedTags = await ondcMapper.map({
      name: 'XYZ',
    });
    const ondcConvertor = new OndcConvertor(ondcMatchedTags);
    const convertedOndcResponse = await ondcConvertor.convert();
    expect(convertedOndcResponse).toStrictEqual(
      {
        descriptor: {
          name: 'XYZ',
        },
      },
    );
  });
  it('should convert platform items to ondc items ', async () => {
    const ondcMapper = new OndcItemMapper(platformMapperConfig);
    const ondcMatchedTags = await ondcMapper.map({
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
    });
    const ondcConvertor = new OndcConvertor(ondcMatchedTags);
    const convertedOndcResponse = await ondcConvertor.convert();
    expect(convertedOndcResponse)
      .toStrictEqual(
        {
          id: '52',
          descriptor: {
            name: 'XYZ',
            images: 'xyz.png',
          },
          parent_item_id: '13',
          category_id: '20',
        },
      );
  });
});
