import { formatLongNumber } from '.';

it('should be correct if string argument', () => {
  expect(formatLongNumber('1234567890')).toBe('1,234,567,890');
});

it('should be correct if number argument', () => {
  expect(formatLongNumber(1234567890)).toBe('1,234,567,890');
});
