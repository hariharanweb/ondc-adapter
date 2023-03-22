import {
  it, expect, describe,
} from 'vitest';
import platformMapperConfig from '../resource/test/expectedMapperOutput.json';
import OndcMapper from './OndcMapper';

describe('OndcMapper', () => {
  it('should match ondc string to platform number ', async () => {
    const platformResponseJSONWithID = [
      {
        id: 52,
      },
    ];
    const ondcMapper = new OndcMapper(platformMapperConfig, platformResponseJSONWithID);
    const matchedJsonWithIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithIdValue).toStrictEqual(
      [
        {
          ONDC: 'id',
          'data-type-ONDC': 'string',
          Platform: '.id',
          'data-type-Platform': 'number',
          'platform-value': '52',
        },
      ],
    );
  });
  it('should match ondc string to platform string ', async () => {
    const platformResponseJSONWithName = [
      {
        name: 'XYZ',
      },
    ];
    const ondcMapper = new OndcMapper(platformMapperConfig, platformResponseJSONWithName);
    const matchedJsonWithNameValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithNameValue).toStrictEqual(
      [
        {
          ONDC: 'descriptor.name',
          'data-type-ONDC': 'string',
          Platform: '.name',
          'data-type-Platform': 'string',
          'platform-value': 'XYZ',
        },
      ],
    );
  });
  it('should match ondc nested object to platform nested object ', async () => {
    const platformResponseJSONWithImageSrc = [
      {
        images: {
          src: 'xyz.png',
        },
      },
    ];
    const ondcMapper = new OndcMapper(platformMapperConfig, platformResponseJSONWithImageSrc);
    const matchedJsonWithImageSrcValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithImageSrcValue).toStrictEqual(
      [
        {
          ONDC: 'descriptor.images',
          'data-type-ONDC': 'string',
          Platform: '.images.src',
          'data-type-Platform': 'string',
          'platform-value': 'xyz.png',
        },
      ],
    );
  });
  it('should match ondc string to platform array object ', async () => {
    const platformResponseJSONWithCategoryId = [
      {
        categories: [
          {
            id: 20,
          },
        ],
      },
    ];
    const ondcMapper = new OndcMapper(platformMapperConfig, platformResponseJSONWithCategoryId);
    const matchedJsonWithCategoryIdValue = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithCategoryIdValue).toStrictEqual(
      [
        {
          ONDC: 'category_id',
          'data-type-ONDC': 'string',
          Platform: '.categories[0].id',
          'data-type-Platform': 'number',
          'platform-value': '20',
        },
      ],
    );
  });
  it('should match ondc tags to platform tags ', async () => {
    const platformResponseJSONWithNameIdAndParentId = [
      {
        id: 52,
        name: 'XYZ',
        parent_id: 13,
        images: {
          src: 'xyz.png',
        },
        categories: [
          {
            id: 20,
          },
        ],
      },
    ];
    const ondcMapper = new OndcMapper(
      platformMapperConfig,
      platformResponseJSONWithNameIdAndParentId,
    );
    const matchedJsonWithNameIdAndParentIdValues = await ondcMapper.getMatchedTags();
    expect(matchedJsonWithNameIdAndParentIdValues)
      .toStrictEqual(
        [
          {
            ONDC: 'id',
            'data-type-ONDC': 'string',
            Platform: '.id',
            'data-type-Platform': 'number',
            'platform-value': '52',
          },
          {
            ONDC: 'descriptor.name',
            'data-type-ONDC': 'string',
            Platform: '.name',
            'data-type-Platform': 'string',
            'platform-value': 'XYZ',
          },
          {
            ONDC: 'parent_item_id',
            'data-type-ONDC': 'string',
            Platform: '.parent_id',
            'data-type-Platform': 'number',
            'platform-value': '13',
          },
          {
            ONDC: 'descriptor.images',
            'data-type-ONDC': 'string',
            Platform: '.images.src',
            'data-type-Platform': 'string',
            'platform-value': 'xyz.png',
          },
          {
            ONDC: 'category_id',
            'data-type-ONDC': 'string',
            Platform: '.categories[0].id',
            'data-type-Platform': 'number',
            'platform-value': '20',
          },
        ],
      );
  });
});
