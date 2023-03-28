import {
  it, expect, describe,
} from 'vitest';
import PlatformFormatter from './PlatformFormatter';

describe('Platform Formatter', () => {
  it('should format input according to filter', async () => {
    const expectedFormattedResponse = 20;
    const filter = ' . | .id';
    const input = {
      id: 20,
    };
    const actualFormattedResponse = await PlatformFormatter.format(filter, input);
    expect(actualFormattedResponse).toStrictEqual(expectedFormattedResponse);
  });
});
