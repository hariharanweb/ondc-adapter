import {
  it, expect, describe,
} from 'vitest';
import OndcSearchExtractor from './OndcSearchExtractor.js';

describe('OndcSearchExtractor', () => {
  it('should convert ONDC Search Request with PRODUCT_NAME to extracted Dictionary', async () => {
    const ondcSearchJson = {
      context:
          {
            domain: 'nic2004:52110',
            action: 'search',
            country: 'IND',
            city: 'std:080',
            core_version: '1.1.0',
            bap_id: 'buyerapp.com',
            bap_uri: 'https://buyerapp.com/ondc',
            transaction_id: '3df395a9-c196-4678-a4d1-5eaf4f7df8dc',
            message_id: '1655281254860',
            timestamp: '2023-02-03T08:00:00.000Z',
            ttl: 'PT30S',
          },
      message:
          {
            intent:
              {
                item:
                  {
                    descriptor:
                      {
                        name: 'coffee',
                      },
                  },
                fulfillment:
                  {
                    type: 'Delivery',
                    end:
                      {
                        location:
                          {
                            gps: '12.974002,77.613458',
                            address:
                              {
                                area_code: '560001',
                              },
                          },
                      },
                  },
                payment:
                  {
                    '@ondc/org/buyer_app_finder_fee_type': 'percent',
                    '@ondc/org/buyer_app_finder_fee_amount': '3',
                  },
              },
          },
    };
    const expectedondcDictionary = {
      productName: 'coffee',
      categoryId: '',
      categoryName: '',
      productId: '',
    };
    const ondcSearchDictionary = OndcSearchExtractor.extract(ondcSearchJson);
    expect(ondcSearchDictionary)
      .toStrictEqual(
        expectedondcDictionary,
      );
  });

  it('should convert ONDC Search Request with PRODUCT_NAME & CATEGORY_ID to extracted Dictionary', async () => {
    const ondcSearchJson = {
      context:
        {
          domain: 'nic2004:52110',
          action: 'search',
          country: 'IND',
          city: 'std:080',
          core_version: '1.1.0',
          bap_id: 'buyerapp.com',
          bap_uri: 'https://buyerapp.com/ondc',
          transaction_id: '3df395a9-c196-4678-a4d1-5eaf4f7df8dc',
          message_id: '1655281254860',
          timestamp: '2023-02-03T08:00:00.000Z',
          ttl: 'PT30S',
        },
      message:
        {
          intent:
            {
              category:
                {
                  id: 'Grocery',
                },
              item:
                {
                  descriptor:
                    {
                      name: 'coffee',
                    },
                },
              fulfillment:
                {
                  type: 'Delivery',
                  end:
                    {
                      location:
                        {
                          gps: '12.974002,77.613458',
                          address:
                            {
                              area_code: '560001',
                            },
                        },
                    },
                },
              payment:
                {
                  '@ondc/org/buyer_app_finder_fee_type': 'percent',
                  '@ondc/org/buyer_app_finder_fee_amount': '3',
                },
            },
        },
    };
    const expectedondcDictionary = {
      productName: 'coffee',
      categoryId: 'Grocery',
      categoryName: '',
      productId: '',
    };
    const ondcSearchDictionary = OndcSearchExtractor.extract(ondcSearchJson);
    expect(ondcSearchDictionary)
      .toStrictEqual(
        expectedondcDictionary,
      );
  });

  it('should convert ONDC Search Request with PRODUCT_ID to extracted Dictionary', async () => {
    const ondcSearchJson = {
      context:
        {
          domain: 'nic2004:52110',
          action: 'search',
          country: 'IND',
          city: 'std:080',
          core_version: '1.1.0',
          bap_id: 'buyerapp.com',
          bap_uri: 'https://buyerapp.com/ondc',
          transaction_id: '3df395a9-c196-4678-a4d1-5eaf4f7df8dc',
          message_id: '1655281254860',
          timestamp: '2023-02-03T08:00:00.000Z',
          ttl: 'PT30S',
        },
      message:
        {
          intent:
            {
              item:
                {
                  id: 'c234m',
                },
              fulfillment:
                {
                  type: 'Delivery',
                  end:
                    {
                      location:
                        {
                          gps: '12.974002,77.613458',
                          address:
                            {
                              area_code: '560001',
                            },
                        },
                    },
                },
              payment:
                {
                  '@ondc/org/buyer_app_finder_fee_type': 'percent',
                  '@ondc/org/buyer_app_finder_fee_amount': '3',
                },
            },
        },
    };
    const expectedondcDictionary = {
      productName: '',
      productId: 'c234m',
      categoryId: '',
      categoryName: '',
    };
    const ondcSearchDictionary = OndcSearchExtractor.extract(ondcSearchJson);
    expect(ondcSearchDictionary)
      .toStrictEqual(
        expectedondcDictionary,
      );
  });

  it('should convert ONDC Search Request with CATEGORY_NAME to extracted Dictionary', async () => {
    const ondcSearchJson = {
      context:
        {
          domain: 'nic2004:52110',
          action: 'search',
          country: 'IND',
          city: 'std:080',
          core_version: '1.1.0',
          bap_id: 'buyerapp.com',
          bap_uri: 'https://buyerapp.com/ondc',
          transaction_id: '3df395a9-c196-4678-a4d1-5eaf4f7df8dc',
          message_id: '1655281254860',
          timestamp: '2023-02-03T08:00:00.000Z',
          ttl: 'PT30S',
        },
      message:
        {
          intent:
            {
              category:
                {
                  descriptor: {
                    name: 'Groceries',
                  },
                },
              item:
                {
                  id: 'c234m',
                },
              fulfillment:
                {
                  type: 'Delivery',
                  end:
                    {
                      location:
                        {
                          gps: '12.974002,77.613458',
                          address:
                            {
                              area_code: '560001',
                            },
                        },
                    },
                },
              payment:
                {
                  '@ondc/org/buyer_app_finder_fee_type': 'percent',
                  '@ondc/org/buyer_app_finder_fee_amount': '3',
                },
            },
        },
    };
    const expectedondcDictionary = {
      productName: '',
      productId: 'c234m',
      categoryId: '',
      categoryName: 'Groceries',
    };
    const ondcSearchDictionary = OndcSearchExtractor.extract(ondcSearchJson);
    expect(ondcSearchDictionary)
      .toStrictEqual(
        expectedondcDictionary,
      );
  });

  it('should convert ONDC Search Request with NO_VALUE to extracted Dictionary', async () => {
    const ondcSearchJson = {
      context:
        {
          domain: 'nic2004:52110',
          action: 'search',
          country: 'IND',
          city: 'std:080',
          core_version: '1.1.0',
          bap_id: 'buyerapp.com',
          bap_uri: 'https://buyerapp.com/ondc',
          transaction_id: '3df395a9-c196-4678-a4d1-5eaf4f7df8dc',
          message_id: '1655281254860',
          timestamp: '2023-02-03T08:00:00.000Z',
          ttl: 'PT30S',
        },
      message:
        {
          intent:
            {
              category:
                {
                },
              item:
                {
                },
              fulfillment:
                {
                  type: 'Delivery',
                  end:
                    {
                      location:
                        {
                          gps: '12.974002,77.613458',
                          address:
                            {
                              area_code: '560001',
                            },
                        },
                    },
                },
              payment:
                {
                  '@ondc/org/buyer_app_finder_fee_type': 'percent',
                  '@ondc/org/buyer_app_finder_fee_amount': '3',
                },
            },
        },
    };
    const expectedondcDictionary = {
      productName: '',
      productId: '',
      categoryId: '',
      categoryName: '',
    };
    const ondcSearchDictionary = OndcSearchExtractor.extract(ondcSearchJson);
    expect(ondcSearchDictionary)
      .toStrictEqual(
        expectedondcDictionary,
      );
  });
});
