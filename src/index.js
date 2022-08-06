const ToCsv = require('./services/toCsv');
const ToJson = require('./services/toJson');

module.exports.convertJsonToCsv = async (path, savePath) => {
  const toCsv = new ToCsv({ path, savePath });
  return toCsv.execute();
};

module.exports.convertCsvToJson = async (path, savePath) => {
  const toCsv = new ToJson({ path, savePath });
  return toCsv.execute();
};
