const ToCsv = require('../src/services/toCsv');
const ToJson = require('../src/services/toJson');
const { convertJsonToCsv, convertCsvToJson } = require('../src/index');

jest.mock('node:fs/promises', () => ({
  readFile: jest.requireActual('node:fs/promises').readFile,
  writeFile: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('Export index modules', () => {
  it('Should be able to call convertJsonToCsv and return execution successfully', async () => {
    const convertJsonToCsvSpy = jest.spyOn(ToCsv.prototype, ToCsv.prototype.execute.name);

    const savePath = './mocks';
    const path = './mocks/correctJsonData.json';
    const response = await convertJsonToCsv(path, savePath);

    expect(convertJsonToCsvSpy).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual({
      message: 'success!',
      filename: expect.any(String),
      filepath: expect.any(String),
    });
  });

  it('Should be able to call convertCsvToJson and return execution successfully', async () => {
    const convertJsonToCsvSpy = jest.spyOn(ToJson.prototype, ToJson.prototype.execute.name);

    const savePath = './mocks';
    const path = './mocks/correctCsvData.csv';
    const response = await convertCsvToJson(path, savePath);

    expect(convertJsonToCsvSpy).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual({
      message: 'success!',
      filename: expect.any(String),
      filepath: expect.any(String),
    });
  });
});
