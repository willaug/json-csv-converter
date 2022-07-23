const { resolve, dirname } = require('node:path');
const { readFile } = require('node:fs/promises');

class BaseConverter {
  static fileToBuffer(path) {
    const mainFilename = dirname(require.main.filename);
    const normalizedPath = resolve(mainFilename, path);
    return readFile(normalizedPath);
  }

  static convert(data) {
    throw new Error('not implemented', data);
  }

  static validate(data) {
    throw new Error('not implemented', data);
  }

  static sanitize(data) {
    throw new Error('not implemented', data);
  }
}

module.exports = BaseConverter;
