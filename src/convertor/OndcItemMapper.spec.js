import {
  it, expect, describe,
} from 'vitest';
import platformMapperConfig from '../resource/test/expectedMapperOutput.json';
import OndcItemMapper from './OndcItemMapper';

describe('OndcItemMapper', () => {
  it('should match ondc string to platform string ', async () => {
    const responseWithName = {
      name: 'XYZ',
    };
    const config = [{
      ondc: 'descriptor.name',
      ondcDataType: 'string',
      platform: '.name',
      platformDataType: 'string',
    }];
    const ondcItemMapper = new OndcItemMapper(config);
    const mappedNameValue = await ondcItemMapper.map(responseWithName);
    expect(mappedNameValue).toStrictEqual(
      [
        {
          ondc: 'descriptor.name',
          ondcDataType: 'string',
          platform: '.name',
          platformDataType: 'string',
          platformValue: 'XYZ',
        },
      ],
    );
  });
  it('should match ondc string to platform number ', async () => {
    const responseWithId = {
      id: 52,
    };
    const config = [
      {
        ondc: 'id',
        ondcDataType: 'string',
        platform: '.id',
        platformDataType: 'number',
      }];
    const ondcItemMapper = new OndcItemMapper(config);
    const mappedIdValue = await ondcItemMapper.map(responseWithId);
    expect(mappedIdValue).toStrictEqual(
      [
        {
          ondc: 'id',
          ondcDataType: 'string',
          platform: '.id',
          platformDataType: 'number',
          platformValue: '52',
        },
      ],
    );
  });
  it('should match ondc nested object to platform nested object ', async () => {
    const responseWithImages = {
      images: [{
        src: 'xyz.png',
      }],
    };
    const config = [{
      ondc: 'descriptor.images',
      ondcDataType: 'string',
      platform: '.images[0].src',
      platformDataType: 'string',
    }];
    const ondcItemMapper = new OndcItemMapper(
      config,
    );
    const mappedImageSrcValue = await ondcItemMapper.map(responseWithImages);
    expect(mappedImageSrcValue).toStrictEqual(
      [
        {
          ondc: 'descriptor.images',
          ondcDataType: 'string',
          platform: '.images[0].src',
          platformDataType: 'string',
          platformValue: 'xyz.png',
        },
      ],
    );
  });
  it('should match ondc string to platform array object ', async () => {
    const responseWithCategory = {
      categories: [
        {
          id: 20,
        },
      ],
    };
    const config = [{
      ondc: 'category_id',
      ondcDataType: 'string',
      platform: '.categories[0].id',
      platformDataType: 'number',
    }];
    const ondcItemMapper = new OndcItemMapper(
      config,
    );
    const mappedCategoryIdValue = await ondcItemMapper.map(responseWithCategory);
    expect(mappedCategoryIdValue).toStrictEqual(
      [
        {
          ondc: 'category_id',
          ondcDataType: 'string',
          platform: '.categories[0].id',
          platformDataType: 'number',
          platformValue: '20',
        },
      ],
    );
  });
  it('should match ondc tags to platform tags ', async () => {
    const response = {
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
    };
    const ondcItemMapper = new OndcItemMapper(
      platformMapperConfig,
    );
    const mappedResponse = await ondcItemMapper.map(response);
    expect(mappedResponse)
      .toStrictEqual(
        [
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
            platform: '.images[0].src',
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
        ],
      );
  });
});
