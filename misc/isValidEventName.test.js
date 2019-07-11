const isValidEventName = require('./isValidEventName');

test('should return false for invalid event name', () => {
  expect(isValidEventName('')).toBe(false);
});

test('should return false for invalid event name', () => {
  expect(isValidEventName(123)).toBe(false);
});

test('should return false for invalid event name', () => {
  expect(isValidEventName([])).toBe(false);
});

test('should return false for invalid event name', () => {
  expect(isValidEventName(undefined)).toBe(false);
});

test('should return false for invalid event name', () => {
  expect(isValidEventName(null)).toBe(false);
});

test('should return false for invalid event name', () => {
  expect(isValidEventName(NaN)).toBe(false);
});

test('should return true for valid event name', () => {
  expect(isValidEventName('Hey')).toBe(true);
});

test('should return true for valid event name', () => {
  expect(isValidEventName(' a ')).toBe(true);
});

test('should return true for valid event name', () => {
  expect(isValidEventName('Somebody Once Told Me')).toBe(true);
});