const fs = require('node:fs/promises');
const ToCsv = require('../../../src/services/toCsv');
const correctJsonData = require('../../mocks/correctJsonData.json');

jest.mock('node:fs/promises', () => ({
  readFile: jest.requireActual('node:fs/promises').readFile,
  writeFile: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('ToCsv', () => {
  describe('Success', () => {
    it('Should be able to execute all suit and create a file', async () => {
      const writeFileSpy = jest.spyOn(fs, 'writeFile');

      const toCsv = new ToCsv({
        path: '../../mocks/correctJsonData.json',
        savePath: '../../mocks/',
      });

      await toCsv.execute();

      expect(writeFileSpy).toBeCalledWith(expect.any(String), toCsv.convertedContent);
    });

    it('Should be able to convert an array in string', () => {
      const toCsv = new ToCsv({});
      toCsv.data = correctJsonData;
      toCsv.headers = ['id', 'name', 'age'];
      toCsv.convert();

      expect(toCsv.convertedContent).toContain('id,name,age');
      expect(toCsv.convertedContent).toContain('c9c9c5c5-fdd1-573a-8aaa-8791795db943,William,19');
      expect(toCsv.convertedContent).toContain('a3eac847-5845-5055-9829-db2d68181919,Will,20');
      expect(toCsv.convertedContent).toContain('4669f692-18a0-59c0-9daa-8d69ff2808f3,,21');
    });

    it('Should be able to create headers list based in data array', () => {
      const toCsv = new ToCsv({});
      toCsv.data = correctJsonData;
      toCsv.createHeaders();

      expect(toCsv.headers).toHaveLength(3);
      expect(toCsv.headers).toStrictEqual(['id', 'name', 'age']);
    });

    it('Should be able to convert json file in javascript array', async () => {
      const toCsv = new ToCsv({ path: '../../mocks/correctJsonData.json' });
      await toCsv.fileToBuffer();
      toCsv.bufferToArray();

      expect(toCsv.data).toStrictEqual(correctJsonData);
    });

    it('Should be able to validate a valid file and not return an error', async () => {
      const toCsv = new ToCsv({ path: '../../mocks/correctJsonData.json', savePath: '../../mocks/files' });
      await toCsv.fileToBuffer();
      toCsv.validate();
    });
  });

  describe('Errors', () => {
    it('Should be able to validate inexistent path and return an error', () => {
      const toCsv = new ToCsv({});
      const validateFunction = () => toCsv.validate();

      expect(validateFunction).toThrow(Error);
      expect(validateFunction).toThrow('path is required');
    });

    it('Should be able to validate inexistent savePath and return an error', () => {
      const toCsv = new ToCsv({ path: './mocks/correctCsvData.csv' });
      const validateFunction = () => toCsv.validate();

      expect(validateFunction).toThrow(Error);
      expect(validateFunction).toThrow('savePath is required');
    });

    it('Should be able to validate invalid extension file and return an error', async () => {
      const toCsv = new ToCsv({ path: '../../mocks/correctCsvData.csv', savePath: '../../mocks/files' });
      await toCsv.fileToBuffer();
      const validateFunction = () => toCsv.validate();

      expect(validateFunction).toThrow(Error);
      expect(validateFunction).toThrow('invalid file extension');
    });
  });
});
