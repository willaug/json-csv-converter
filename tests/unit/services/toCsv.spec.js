const fs = require('node:fs/promises');
const ToCsv = require('../../../src/services/toCsv');
const correctJsonData = require('../../mocks/correctJsonData.json');
const correctJsonDataObject = require('../../mocks/correctJsonDataObject.json');

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

      const response = await toCsv.execute();

      expect(response).toStrictEqual({
        message: 'success!',
        filename: toCsv.filename,
        filepath: toCsv.filepath,
      });

      expect(writeFileSpy).toBeCalledWith(expect.any(String), toCsv.convertedContent);

      expect(toCsv.extension).toBe('csv');
      expect(toCsv.data).toStrictEqual(correctJsonData);
      expect(toCsv.headers).toStrictEqual(['id', 'name', 'age']);
      expect(toCsv.convertedContent).toContain('id,name,age');
      expect(toCsv.convertedContent).toContain('c9c9c5c5-fdd1-573a-8aaa-8791795db943,William,19');
      expect(toCsv.convertedContent).toContain('a3eac847-5845-5055-9829-db2d68181919,Will,20');
      expect(toCsv.convertedContent).toContain('4669f692-18a0-59c0-9daa-8d69ff2808f3,,21');
    });

    it('Should be able to execute all suit and create a file with a json object', async () => {
      const writeFileSpy = jest.spyOn(fs, 'writeFile');

      const toCsv = new ToCsv({
        path: '../../mocks/correctJsonDataObject.json',
        savePath: '../../mocks/',
      });

      const response = await toCsv.execute();

      expect(response).toStrictEqual({
        message: 'success!',
        filename: toCsv.filename,
        filepath: toCsv.filepath,
      });

      expect(writeFileSpy).toBeCalledWith(expect.any(String), toCsv.convertedContent);

      expect(toCsv.extension).toBe('csv');
      expect(toCsv.data).toStrictEqual([correctJsonDataObject]);
      expect(toCsv.headers).toStrictEqual(['id', 'name', 'age']);
      expect(toCsv.convertedContent).toContain('id,name,age');
      expect(toCsv.convertedContent).toContain('c9c9c5c5-fdd1-573a-8aaa-8791795db943,William,19');
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
