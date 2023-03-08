import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('returns the dats in the correct format', () => {
    const res = formatDate('2022-12-16T12:41:33.736Z');
    expect(res).toBe('December 16, 2022');
  });
});
