const fs = require('node:fs/promises');
const ToCsv = require('../../src/services/toCsv');

jest.mock('node:fs/promises', () => ({
  readFile: jest.requireActual('node:fs/promises').readFile,
  writeFile: jest.fn(),
}));

describe('ToCsvConverterE2E', () => {
  it('Should be able to convert a json file to array and create a new csv file', async () => {
    const writeFileSpy = jest.spyOn(fs, 'writeFile');

    const toCsv = new ToCsv({
      path: '../mocks/correctJsonData.json',
      savePath: '../mocks/',
    });

    await toCsv.execute();

    expect(toCsv.convertedContent).toContain('id,name,age');
    expect(toCsv.convertedContent).toContain('c9c9c5c5-fdd1-573a-8aaa-8791795db943,William,19');
    expect(toCsv.convertedContent).toContain('a3eac847-5845-5055-9829-db2d68181919,Will,20');
    expect(toCsv.convertedContent).toContain('4669f692-18a0-59c0-9daa-8d69ff2808f3,,21');
    expect(writeFileSpy).toBeCalledWith(expect.any(String), toCsv.convertedContent);
  });
});
