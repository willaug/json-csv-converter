const fs = require('node:fs/promises');
const BaseConverter = require('../../../src/shared/baseConverter');

jest.mock('node:fs/promises', () => ({
  readFile: jest.requireActual('node:fs/promises').readFile,
  writeFile: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('BaseConverter', () => {
  it('Should be able to read a file and return a buffer', async () => {
    const baseConverter = new BaseConverter({ path: '../../mocks/correctCsvData.csv' });
    await baseConverter.fileToBuffer();

    expect(baseConverter.file).toBeInstanceOf(Buffer);
  });

  it('Should be able to create a file', async () => {
    const writeFileSpy = jest.spyOn(fs, 'writeFile');

    const baseConverter = new BaseConverter({
      path: '../../mocks/correctCsvData.csv',
      savePath: '../../mocks',
    });

    baseConverter.extension = 'json';
    baseConverter.convertedContent = JSON.stringify([{
      id: 1,
      name: 'William',
    }]);

    await baseConverter.createFile();
    expect(writeFileSpy).toBeCalledWith(expect.any(String), baseConverter.convertedContent);
  });

  describe('NotImplementedFunctions', () => {
    it('Should be able to call execute function and throw not implemented error', () => {
      const baseConverter = new BaseConverter({});
      const notImplementedException = () => baseConverter.execute();

      expect(notImplementedException).toThrow(Error);
      expect(notImplementedException).toThrow('the "execute" function was not implemented!');
    });

    it('Should be able to call setExtension function and throw not implemented error', () => {
      const baseConverter = new BaseConverter({});
      const notImplementedException = () => baseConverter.setExtension();

      expect(notImplementedException).toThrow(Error);
      expect(notImplementedException).toThrow('the "setExtension" function was not implemented!');
    });

    it('Should be able to call convert function and throw not implemented error', () => {
      const baseConverter = new BaseConverter({});
      const notImplementedException = () => baseConverter.convert();

      expect(notImplementedException).toThrow(Error);
      expect(notImplementedException).toThrow('the "convert" function was not implemented!');
    });

    it('Should be able to call createHeaders function and throw not implemented error', () => {
      const baseConverter = new BaseConverter({});
      const notImplementedException = () => baseConverter.createHeaders();

      expect(notImplementedException).toThrow(Error);
      expect(notImplementedException).toThrow('the "createHeaders" function was not implemented!');
    });

    it('Should be able to call validate function and throw not implemented error', () => {
      const baseConverter = new BaseConverter({});
      const notImplementedException = () => baseConverter.validate();

      expect(notImplementedException).toThrow(Error);
      expect(notImplementedException).toThrow('the "validate" function was not implemented!');
    });

    it('Should be able to call bufferToData function and throw not implemented error', () => {
      const baseConverter = new BaseConverter({});
      const notImplementedException = () => baseConverter.bufferToData();

      expect(notImplementedException).toThrow(Error);
      expect(notImplementedException).toThrow('the "bufferToData" function was not implemented!');
    });
  });
});
