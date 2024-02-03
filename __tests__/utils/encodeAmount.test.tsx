import {describe, test, expect} from '@jest/globals';
import {encodeAmount} from '../../utils';
// Import the encodeAmount function

// Test cases
describe('encodeAmount function', () => {
  test('formats a positive integer without decimal places', () => {
    const result = encodeAmount(1234567);
    expect(result).toBe('1,234,567');
  });

  test('formats a positive float with decimal places', () => {
    const result = encodeAmount(12345.6789);
    expect(result).toBe('12,345.6789');
  });

  test('formats a negative float with decimal places', () => {
    const result = encodeAmount(-9876.54321);
    expect(result).toBe('-9,876.54321');
  });

  test('formats a string representing a positive float without decimal places', () => {
    const result = encodeAmount('9876543');
    expect(result).toBe('9,876,543');
  });

  test('formats a string representing a negative integer without decimal places', () => {
    const result = encodeAmount('-123456');
    expect(result).toBe('-123,456');
  });

  test('handles a string representing a float with multiple decimal points', () => {
    const result = encodeAmount('12.34.56');
    expect(result).toBe('12.34.56');
  });

  test('handles a start with dot', () => {
    const result = encodeAmount('.91238321');
    expect(result).toBe('0.91238321');
  });

  // Add more test cases as needed
});
