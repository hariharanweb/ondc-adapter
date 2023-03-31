import {
  it, expect, describe,
} from 'vitest';
import platformMapperConfig from '../resource/test/expectedMapperOutput.json';
import ItemMapper from './ItemMapper';

describe('ItemMapper', () => {
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
    const itemMapper = new ItemMapper(config);
    const mappedNameValue = await itemMapper.map(responseWithName);
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
    const itemMapper = new ItemMapper(config);
    const mappedIdValue = await itemMapper.map(responseWithId);
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
  it('should match ondc array object to platform array object ', async () => {
    const responseWithImages = {
      images: [{
        src: 'xyz.png',
      }],
    };
    const config = [{
      ondc: 'descriptor.images',
      ondcDataType: 'string',
      platform: '.images[].src',
      platformDataType: 'string',
    }];
    const itemMapper = new ItemMapper(
      config,
    );
    const mappedImageSrcValue = await itemMapper.map(responseWithImages);
    expect(mappedImageSrcValue).toStrictEqual(
      [
        {
          ondc: 'descriptor.images',
          ondcDataType: 'string',
          platform: '.images[].src',
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
    const itemMapper = new ItemMapper(
      config,
    );
    const mappedCategoryIdValue = await itemMapper.map(responseWithCategory);
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
    const itemMapper = new ItemMapper(
      platformMapperConfig,
    );
    const mappedResponse = await itemMapper.map(response);
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
            ondcDataType: '',
            platform: '.images | map(.src)',
            platformDataType: 'string',
            platformValue: '["xyz.png"]',
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
