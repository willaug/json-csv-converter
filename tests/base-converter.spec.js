const BaseConverter = require('../src/services/baseConverter');

describe('BaseConverterClass', () => {
  it('Should be able to read a file and return a buffer', async () => {
    const response = await BaseConverter.fileToBuffer('./mocks/correct-csv-data.csv');
    expect(response).toBeInstanceOf(Buffer);
  });

  it('Should be able to call not implement convert function and return an error', () => {
    const sanitizeFunction = () => BaseConverter.convert(undefined);
    expect(sanitizeFunction).toThrow(Error);
    expect(sanitizeFunction).toThrow('not implemented');
  });

  it('Should be able to call not implement validation function and return an error', () => {
    const validateFunction = () => BaseConverter.validate(undefined);
    expect(validateFunction).toThrow(Error);
    expect(validateFunction).toThrow('not implemented');
  });

  it('Should be able to call not implement sanitization function and return an error', () => {
    const sanitizeFunction = () => BaseConverter.sanitize(undefined);
    expect(sanitizeFunction).toThrow(Error);
    expect(sanitizeFunction).toThrow('not implemented');
  });
});
