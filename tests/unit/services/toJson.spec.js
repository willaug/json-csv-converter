const fs = require('node:fs/promises');
const ToJson = require('../../../src/services/toJson');

jest.mock('node:fs/promises', () => ({
  readFile: jest.requireActual('node:fs/promises').readFile,
  writeFile: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('ToJson', () => {
  describe('Success', () => {
    it('Should be able to execute all suit and create a file', async () => {
      const writeFileSpy = jest.spyOn(fs, 'writeFile');

      const toJson = new ToJson({
        path: '../../mocks/correctCsvData.csv',
        savePath: '../../mocks/',
      });

      const response = await toJson.execute();

      expect(response).toStrictEqual({
        message: 'success!',
        filename: toJson.filename,
        filepath: toJson.filepath,
      });

      expect(writeFileSpy).toBeCalledWith(expect.any(String), toJson.convertedContent);

      const csvData = [
        'id,name,age',
        'c9c9c5c5-fdd1-573a-8aaa-8791795db943,William,19',
        'a3eac847-5845-5055-9829-db2d68181919,Will,20',
        '4669f692-18a0-59c0-9daa-8d69ff2808f3,,21',
      ];

      expect(toJson.extension).toBe('json');
      expect(toJson.data).toContain(csvData.join('\n'));
      expect(toJson.headers).toStrictEqual(['id', 'name', 'age']);
      expect(toJson.convertedContent).toHaveLength(3);
      expect(toJson.convertedContent).toStrictEqual([
        {
          id: 'c9c9c5c5-fdd1-573a-8aaa-8791795db943',
          name: 'William',
          age: 19,
        },
        {
          id: 'a3eac847-5845-5055-9829-db2d68181919',
          name: 'Will',
          age: 20,
        },
        {
          id: '4669f692-18a0-59c0-9daa-8d69ff2808f3',
          name: null,
          age: 21,
        },
      ]);
    });
  });

  describe('Errors', () => {
    it('Should be able to validate inexistent path and return an error', () => {
      const toJson = new ToJson({});
      const validateFunction = () => toJson.validate();

      expect(validateFunction).toThrow(Error);
      expect(validateFunction).toThrow('path is required');
    });

    it('Should be able to validate inexistent savePath and return an error', () => {
      const toJson = new ToJson({ path: './mocks/correctCsvData.csv' });
      const validateFunction = () => toJson.validate();

      expect(validateFunction).toThrow(Error);
      expect(validateFunction).toThrow('savePath is required');
    });

    it('Should be able to validate invalid extension file and return an error', async () => {
      const toJson = new ToJson({ path: '../../mocks/correctJsonData.json', savePath: '../../mocks/files' });
      await toJson.fileToBuffer();
      const validateFunction = () => toJson.validate();

      expect(validateFunction).toThrow(Error);
      expect(validateFunction).toThrow('invalid file extension');
    });
  });
});
