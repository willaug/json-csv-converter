const { resolve, dirname } = require('node:path');
const { randomBytes } = require('node:crypto');
const { readFile, writeFile } = require('node:fs/promises');

class BaseConverter {
  constructor({ path, savePath }) {
    this.path = path;
    this.savePath = savePath;

    this.data = [];
    this.file = null;
    this.headers = [];
    this.extension = null;
    this.convertedContent = null;
  }

  async createFile() {
    const mainFilename = dirname(require.main.filename);
    const normalizedPath = resolve(mainFilename, this.savePath);
    const filename = `${normalizedPath}/${randomBytes(8).toString('hex')}.${this.extension}`;
    await writeFile(filename, this.convertedContent);
  }

  async fileToBuffer() {
    const mainFilename = dirname(require.main.filename);
    const normalizedPath = resolve(mainFilename, this.path);
    this.file = await readFile(normalizedPath);
  }
}

module.exports = BaseConverter;
