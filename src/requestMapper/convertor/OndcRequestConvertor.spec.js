import {
  it, expect, describe,
} from 'vitest';
import OndcRequestConvertor from './OndcRequestConvertor';

describe('OndcRequestConvertor', () => {
  it('should convert one ondc item to one platform item according to given config ', async () => {
    const ondcResponseItem = {
      id: '52',
      descriptor: {
        name: 'T-shirt',
        short_desc: '<p>Hoodie in sweatshirt fabric made from a cotton blend. This is a simple product.</p>\n',
      },
      price: {
        value: '350',
        listed_value: '400',
      },
    };
    const expectedPlatformResponseItem = {
      id: 52,
      name: 'T-shirt',
      short_description: '<p>Hoodie in sweatshirt fabric made from a cotton blend. This is a simple product.</p>\n',
      price: '350',
      regular_price: '400',
    };
    const ondcRequestConvertor = new OndcRequestConvertor(ondcResponseItem);
    const actualPlatformItemJson = await ondcRequestConvertor.convert();
    expect(actualPlatformItemJson).toStrictEqual(expectedPlatformResponseItem);
  });
});
