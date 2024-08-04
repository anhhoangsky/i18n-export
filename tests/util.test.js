
import { flattenObject } from '../src/util.js';

describe("flattenObject", () => {
    it("should flatten a simple object with no nested objects", () => {
    const input = { a: 1, b: 2, c: 3 };
    const expectedOutput = { a: 1, b: 2, c: 3 };
    const result = flattenObject(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should flatten an object with nested objects", () => {
    const input = { a: 1, b: { c: 2, d: 3 }, e: 4 };
    const expectedOutput = { a: 1, 'b.c': 2, 'b.d': 3, e: 4 };
    const result = flattenObject(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should flatten an empty object", () => {
    const input = {};
    const expectedOutput = {};
    const result = flattenObject(input);
    expect(result).toEqual(expectedOutput);
  });
});

