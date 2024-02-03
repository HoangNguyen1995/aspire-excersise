import {it, describe, test, expect} from '@jest/globals';
import {decodeAmount} from '../../utils';

// const decodeAmount = require('./path-to-your-file'); // Update the path accordingly

describe('decodeAmount function', () => {
  test('removes spaces, commas, plus, and minus signs from the text', () => {
    const inputText = '12,345.67 + $100 - 50';
    const result = decodeAmount(inputText);
    expect(result).toBe('12345.6710050');
  });

  test('handles an empty string', () => {
    const inputText = '';
    const result = decodeAmount(inputText);
    expect(result).toBe('');
  });

  test('handles a string with no numeric characters', () => {
    const inputText = 'No numbers here!';
    const result = decodeAmount(inputText);
    expect(result).toBe('');
  });

  test('handles a string with only commas and spaces', () => {
    const inputText = '1,000, 2,000, 3,000';
    const result = decodeAmount(inputText);
    expect(result).toBe('100020003000');
  });

  test('handles a string with only minus signs', () => {
    const inputText = '---';
    const result = decodeAmount(inputText);
    expect(result).toBe('');
  });

  test('handles a string with only plus signs', () => {
    const inputText = '+++';
    const result = decodeAmount(inputText);
    expect(result).toBe('');
  });

  // Add more test cases as needed
});
