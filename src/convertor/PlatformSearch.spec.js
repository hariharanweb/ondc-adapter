import {
  it, expect, describe,
} from 'vitest';
import PlatformSearchConvertor from './PlatformSearch.js';

describe('generateUrl', () => {
  it('should return default URL when all input properties are empty', () => {
    const inputObject = {
      productName: '',
      productId: '',
      categoryId: '',
      categoryName: '',
    };
    const expectedOutput = 'https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04';
    expect(PlatformSearchConvertor.generateRequest(inputObject)).toEqual(expectedOutput);
  });

  it('should return search URL when productName is specified', () => {
    const inputObject = {
      productName: 'T-shirt',
      productId: '',
      categoryId: '',
      categoryName: '',
    };
    const expectedOutput = 'https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&search=T-shirt';
    expect(PlatformSearchConvertor.generateRequest(inputObject)).toEqual(expectedOutput);
  });

  it('should return product URL when productId is specified', () => {
    const inputObject = {
      productName: '',
      productId: '52',
      categoryId: '',
      categoryName: '',
    };
    const expectedOutput = 'https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products/52?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04';
    expect(PlatformSearchConvertor.generateRequest(inputObject)).toEqual(expectedOutput);
  });

  it('should return category URL when categoryId is specified', () => {
    const inputObject = {
      productName: '',
      productId: '',
      categoryId: '1382',
      categoryName: '',
    };
    const expectedOutput = 'https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&category=1382';
    expect(PlatformSearchConvertor.generateRequest(inputObject)).toEqual(expectedOutput);
  });

  it('should return category search URL when categoryName is specified', () => {
    const inputObject = {
      productName: '',
      productId: '',
      categoryId: '',
      categoryName: 'Snack',
    };
    const expectedOutput = 'https://woo-delightfully-coral-youth.wpcomstaging.com/wp-json/wc/v3/products/categories?consumer_key=ck_ada5c597aa92323341a37a0b89a81477e7cce5c3&consumer_secret=cs_b273faa254fae759a69f3327fc8024a1a720ac04&search=Snack';
    expect(PlatformSearchConvertor.generateRequest(inputObject)).toEqual(expectedOutput);
  });
});
