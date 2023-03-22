import {
  it, expect, describe,
} from 'vitest';
import wcMapperConfig from '../resource/test/expectedMapperOutput.json';
import OndcMapper from './OndcMapper';

describe('OndcMapper', () => {
  it('should test if id value in matchedJson from wooCommmerce response ', async () => {
    const wcResponseJSONWithID = [
      {
        id: 52,
      },
    ];
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithID);
    const matchedJsonWithIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithIdValue).toStrictEqual(
      [
        {
          ONDC: 'id',
          'data-type-ONDC': 'string',
          'Woo-Commerce': '.id',
          'data-type-WooCommerce': 'number',
          'woo-commerce-value': '52',
        },
      ],
    );
  });
  it('should test if name value in matchedJson from wooCommmerce response ', async () => {
    const wcResponseJSONWithName = [
      {
        name: 'XYZ',
      },
    ];
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithName);
    const matchedJsonWithNameValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithNameValue).toStrictEqual(
      [
        {
          ONDC: 'descriptor.name',
          'data-type-ONDC': 'string',
          'Woo-Commerce': '.name',
          'data-type-WooCommerce': 'string',
          'woo-commerce-value': 'XYZ',
        },
      ],

    );
  });
  it('should test if name and id values in matchedJson from wooCommmerce response ', async () => {
    const wcResponseJSONWithNameAndID = [
      {
        id: 52,
        name: 'XYZ',
      },
    ];
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithNameAndID);
    const matchedJsonWithNameAndIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithNameAndIdValue).toStrictEqual(
      [
        {
          ONDC: 'id',
          'data-type-ONDC': 'string',
          'Woo-Commerce': '.id',
          'data-type-WooCommerce': 'number',
          'woo-commerce-value': '52',
        },
        {
          ONDC: 'descriptor.name',
          'data-type-ONDC': 'string',
          'Woo-Commerce': '.name',
          'data-type-WooCommerce': 'string',
          'woo-commerce-value': 'XYZ',
        },
      ],

    );
  });
  it('should test if parent id value in matchedJson from wooCommmerce response ', async () => {
    const wcResponseJSONWithParentItemId = [
      {
        parent_id: 13,
      },
    ];
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithParentItemId);
    const matchedJsonWithParentIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithParentIdValue).toStrictEqual(
      [
        {
          ONDC: 'parent_item_id',
          'data-type-ONDC': 'string',
          'Woo-Commerce': '.parent_id',
          'data-type-WooCommerce': 'number',
          'woo-commerce-value': '13',
        },
      ],

    );
  });
  it('should test if name, id and parent id values in matchedJson from wooCommmerce response ', async () => {
    const wcResponseJSONWithNameIdAndParentId = [
      {
        id: 52,
        name: 'XYZ',
        parent_id: 13,
      },
    ];
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithNameIdAndParentId);
    const matchedJsonWithNameIdAndParentIdValues = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithNameIdAndParentIdValues)
      .toStrictEqual(
        [
          {
            ONDC: 'id',
            'data-type-ONDC': 'string',
            'Woo-Commerce': '.id',
            'data-type-WooCommerce': 'number',
            'woo-commerce-value': '52',
          },
          {
            ONDC: 'descriptor.name',
            'data-type-ONDC': 'string',
            'Woo-Commerce': '.name',
            'data-type-WooCommerce': 'string',
            'woo-commerce-value': 'XYZ',
          },
          {
            ONDC: 'parent_item_id',
            'data-type-ONDC': 'string',
            'Woo-Commerce': '.parent_id',
            'data-type-WooCommerce': 'number',
            'woo-commerce-value': '13',
          },
        ],

      );
  });
  it('should test if image value in matchedJson from wooCommmerce response ', async () => {
    const wcResponseJSONWithImageSrc = [
      {
        images: {
          src: 'xyz.png',
        },
      },
    ];
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithImageSrc);
    const matchedJsonWithImageSrcValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithImageSrcValue).toStrictEqual(
      [
        {
          ONDC: 'descriptor.images',
          'data-type-ONDC': 'string',
          'Woo-Commerce': '.images.src',
          'data-type-WooCommerce': 'string',
          'woo-commerce-value': 'xyz.png',
        },
      ],

    );
  });
  it('should test if category id value in matchedJson from wooCommmerce response ', async () => {
    const wcResponseJSONWithCategoryId = [
      {
        categories: [
          {
            id: 20,
          },
        ],
      },
    ];
    const ondcMapper = new OndcMapper(wcMapperConfig, wcResponseJSONWithCategoryId);
    const matchedJsonWithCategoryIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithCategoryIdValue).toStrictEqual(
      [
        {
          ONDC: 'category_id',
          'data-type-ONDC': 'string',
          'Woo-Commerce': '.categories[0].id',
          'data-type-WooCommerce': 'number',
          'woo-commerce-value': '20',
        },
      ],

    );
  });
});
