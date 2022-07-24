const BaseConverter = require('./baseConverter');

class ToCsv extends BaseConverter {
  constructor({ path, savePath }) {
    super({ path, savePath });
  }

  async execute() {
    this.extension = 'csv';
    this.validate();

    await this.fileToBuffer();

    this.bufferToArray();
    this.createHeaders();
    this.convert();

    await this.createFile();
  }

  convert() {
    let content = this.headers.join(',');
    content += '\n';

    this.data.forEach((item) => {
      const row = [];

      this.headers.forEach((header) => {
        row.push(item[header]);
      });

      content += row.join(',');
      content += '\n';
    });

    this.convertedContent = content;
  }

  createHeaders() {
    const headersArr = [];

    this.data.forEach((item) => {
      const keys = Object.keys(item);
      keys.forEach((key) => headersArr.push(key));
    });

    const setHeaders = new Set([...headersArr]);
    this.headers = Array.from(setHeaders);
  }

  validate() {
    if (!this.path) throw new Error('path is required');
    if (!this.savePath) throw new Error('savePath is required');
    if (!this.path.includes('.json')) throw new Error('invalid file extension');
  }

  bufferToArray() {
    this.data = JSON.parse(this.file);
  }
}

module.exports = ToCsv;
