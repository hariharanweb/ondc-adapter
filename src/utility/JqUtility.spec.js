import {
  it, expect, describe,
} from 'vitest';
import jqUtility from './JqUtility';

describe('Jq Utility', () => {
  it('should format input according to filter ', async () => {
    const expectedFormattedResponse = 20;
    const filter = ' . | .id';
    const input = {
      id: 20,
    };
    const actualFormattedResponse = await jqUtility.format(filter, input);
    expect(actualFormattedResponse).toStrictEqual(expectedFormattedResponse);
  });

  it('should format images according to filter ', async () => {
    const expectedFormattedResponse = [
      'https://woo-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/hoodie-with-logo-2.jpg',
      'https://woo-51-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/hoodie-with-logo-2.jpg',
    ];
    const filter = '.images | map(.src)';
    const input = {
      id: 21,
      images: [
        {
          id: 50,
          src: 'https://woo-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/hoodie-with-logo-2.jpg',
        },
        {
          id: 51,
          src: 'https://woo-51-freely-maximum-nacho.wpcomstaging.com/wp-content/uploads/2023/03/hoodie-with-logo-2.jpg',
        },
      ],
    };

    const actualFormattedResponse = await jqUtility.format(filter, input);
    expect(actualFormattedResponse).toStrictEqual(expectedFormattedResponse);
  });
});
