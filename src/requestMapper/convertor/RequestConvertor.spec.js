import {
  it, expect, describe,
} from 'vitest';
import RequestConvertor from './RequestConvertor';

describe('RequestConvertor', () => {
  it('should convert ondc item id to platform item id ', async () => {
    const platformMatchedValues = [
      {
        ondc: '.id',
        ondcDataType: 'string',
        platform: 'id',
        platformDataType: 'number',
        platformValue: 52,
      }];
    const convertedPlatformResponse = await RequestConvertor.convert(platformMatchedValues);
    expect(convertedPlatformResponse).toStrictEqual(
      {
        id: 52,
      },
    );
  });

  it('should convert ondc item name to platform item name ', async () => {
    const platformMatchedValues = [{
      ondc: '.descriptor.name',
      ondcDataType: 'string',
      platform: 'name',
      platformDataType: 'string',
      platformValue: 'T-shirt',
    }];
    const platformOndcResponse = await RequestConvertor.convert(platformMatchedValues);
    expect(platformOndcResponse).toStrictEqual(
      {
        name: 'T-shirt',
      },
    );
  });

  it('should convert ondc item short description to platform item short description ', async () => {
    const platformMatchedValues = [{
      ondc: '.descriptor.short_desc',
      ondcDataType: 'string',
      platform: 'short_description',
      platformDataType: 'string',
      platformValue: 'this is a test short_description',
    }];
    const platformOndcResponse = await RequestConvertor.convert(platformMatchedValues);
    expect(platformOndcResponse).toStrictEqual(
      {
        short_description: 'this is a test short_description',
      },
    );
  });

  it('should convert ondc item price value to platform item price ', async () => {
    const platformMatchedValues = [{
      ondc: '.price.value',
      ondcDataType: 'string',
      platform: 'price',
      platformDataType: 'string',
      platformValue: '400',
    }];
    const platformOndcResponse = await RequestConvertor.convert(platformMatchedValues);
    expect(platformOndcResponse).toStrictEqual(
      {
        price: '400',
      },
    );
  });

  it('should convert ondc item price listed value to platform item regular price ', async () => {
    const platformMatchedValues = [{
      ondc: '.price.listed_value',
      ondcDataType: 'string',
      platform: 'regular_price',
      platformDataType: 'string',
      platformValue: '350',
    }];
    const platformOndcResponse = await RequestConvertor.convert(platformMatchedValues);
    expect(platformOndcResponse).toStrictEqual(
      {
        regular_price: '350',
      },
    );
  });
  it('should convert platform items to ondc items ', async () => {
    const ondcMatchedValues = [
      {
        ondc: '.id',
        ondcDataType: 'string',
        platform: 'id',
        platformDataType: 'number',
        platformValue: 52,
      },
      {
        ondc: '.descriptor.name',
        ondcDataType: 'string',
        platform: 'name',
        platformDataType: 'string',
        platformValue: 'T-shirt',
      },
      {
        ondc: '.descriptor.short_desc',
        ondcDataType: 'string',
        platform: 'short_description',
        platformDataType: 'string',
        platformValue: 'this is a test short_description',
      },
      {
        ondc: '.price.value',
        ondcDataType: 'string',
        platform: 'price',
        platformDataType: 'string',
        platformValue: '400',
      },
      {
        ondc: '.price.listed_value',
        ondcDataType: 'string',
        platform: 'regular_price',
        platformDataType: 'string',
        platformValue: '350',
      },
    ];
    const convertedOndcResponse = await RequestConvertor.convert(ondcMatchedValues);
    expect(convertedOndcResponse)
      .toStrictEqual(
        {
          id: 52,
          name: 'T-shirt',
          short_description: 'this is a test short_description',
          price: '400',
          regular_price: '350',
        },
      );
  });
});
