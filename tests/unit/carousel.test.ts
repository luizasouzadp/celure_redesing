import { describe, it, expect } from 'vitest';
import { wrapIndex } from '../../src/lib/carousel';

describe('wrapIndex', () => {
  it('dá a volta nos dois sentidos', () => {
    expect(wrapIndex(-1, 4)).toBe(3);
    expect(wrapIndex(4, 4)).toBe(0);
    expect(wrapIndex(-1, 7)).toBe(6);
    expect(wrapIndex(2, 7)).toBe(2);
  });
});
