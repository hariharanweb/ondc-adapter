import {
  it, expect, describe,
} from 'vitest';
import OndcConvertor from './OndcConvertor';

describe('OndcConvertor', () => {
  it('should convert platform image to ondc image ', async () => {
    const ondcMatchedValues = [
      {
        ondc: 'descriptor.images',
        ondcDataType: '',
        platform: '.images | map(.src)',
        platformDataType: 'string',
        platformValue: '["https://woo-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/hoodie-with-logo-2.jpg"]',
      }];
    const convertedOndcResponse = await OndcConvertor.convert(ondcMatchedValues);
    expect(convertedOndcResponse).toStrictEqual(
      {
        descriptor: {
          images: [
            'https://woo-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/hoodie-with-logo-2.jpg',
          ],
        },
      },
    );
  });

  it('should convert platform item id to ondc item id ', async () => {
    const ondcMatchedValues = [
      {
        ondc: 'id',
        ondcDataType: 'string',
        platform: '.id',
        platformDataType: 'number',
        platformValue: 52,
      }];
    const convertedOndcResponse = await OndcConvertor.convert(ondcMatchedValues);
    expect(convertedOndcResponse).toStrictEqual(
      {
        id: '52',
      },
    );
  });

  it('should convert platform item name to ondc item name ', async () => {
    const ondcMatchedValues = [{
      ondc: 'descriptor.name',
      ondcDataType: 'string',
      platform: '.name',
      platformDataType: 'string',
      platformValue: 'XYZ',
    }];
    const convertedOndcResponse = await OndcConvertor.convert(ondcMatchedValues);
    expect(convertedOndcResponse).toStrictEqual(
      {
        descriptor: {
          name: 'XYZ',
        },
      },
    );
  });
  it('should convert platform items to ondc items ', async () => {
    const ondcMatchedValues = [
      {
        ondc: 'id',
        ondcDataType: 'string',
        platform: '.id',
        platformDataType: 'number',
        platformValue: '52',
      },
      {
        ondc: 'parent_item_id',
        ondcDataType: 'string',
        platform: '.parent_id',
        platformDataType: 'number',
        platformValue: '13',
      },
      {
        ondc: 'descriptor.name',
        ondcDataType: 'string',
        platform: '.name',
        platformDataType: 'string',
        platformValue: 'XYZ',
      },
      {
        ondc: 'descriptor.images',
        ondcDataType: 'string',
        platform: '.images[].src',
        platformDataType: 'string',
        platformValue: 'xyz.png',
      },
      {
        ondc: 'category_id',
        ondcDataType: 'string',
        platform: '.categories[0].id',
        platformDataType: 'number',
        platformValue: '20',
      },
    ];
    const convertedOndcResponse = await OndcConvertor.convert(ondcMatchedValues);
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
