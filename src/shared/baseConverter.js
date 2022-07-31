const { resolve, dirname } = require('node:path');
const { randomBytes } = require('node:crypto');
const { readFile, writeFile } = require('node:fs/promises');
const NotImplementedException = require('./notImplementedException');

class BaseConverter {
  constructor({ path, savePath }) {
    this.path = path;
    this.savePath = savePath;

    this.data = [];
    this.headers = [];

    this.file = null;
    this.extension = null;
    this.convertedContent = null;
  }

  async createFile() {
    const mainFilename = dirname(require.main.filename);
    const normalizedPath = resolve(mainFilename, this.savePath);
    const filename = `${normalizedPath}/${randomBytes(8).toString('hex')}.${this.extension}`;

    await writeFile(filename, this.convertedContent);
    return this;
  }

  async fileToBuffer() {
    const mainFilename = dirname(require.main.filename);
    const normalizedPath = resolve(mainFilename, this.path);

    this.file = await readFile(normalizedPath);
    return this;
  }

  execute() {
    throw new NotImplementedException(this.execute.name);
  }

  setExtension() {
    throw new NotImplementedException(this.setExtension.name);
  }

  convert() {
    throw new NotImplementedException(this.convert.name);
  }

  createHeaders() {
    throw new NotImplementedException(this.createHeaders.name);
  }

  validate() {
    throw new NotImplementedException(this.validate.name);
  }

  bufferToArray() {
    throw new NotImplementedException(this.bufferToArray.name);
  }
}

module.exports = BaseConverter;
