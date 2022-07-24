const fs = require('node:fs/promises');
const BaseConverter = require('../../src/services/baseConverter');

jest.mock('node:fs/promises', () => ({
  readFile: jest.requireActual('node:fs/promises').readFile,
  writeFile: jest.fn(),
}));

describe('BaseConverter', () => {
  it('Should be able to read a file and return a buffer', async () => {
    const baseConverter = new BaseConverter({ path: '../mocks/correctCsvData.csv' });
    await baseConverter.fileToBuffer();

    expect(baseConverter.file).toBeInstanceOf(Buffer);
  });

  it('Should be able to create a file', async () => {
    const writeFileSpy = jest.spyOn(fs, 'writeFile');

    const baseConverter = new BaseConverter({
      path: '../mocks/correctCsvData.csv',
      savePath: '../mocks',
    });

    baseConverter.extension = 'json';
    baseConverter.convertedContent = JSON.stringify([{
      id: 1,
      name: 'William',
    }]);

    await baseConverter.createFile();
    expect(writeFileSpy).toBeCalledWith(expect.any(String), baseConverter.convertedContent);
  });
});
