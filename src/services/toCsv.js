const BaseConverter = require('../shared/baseConverter');

class ToCsv extends BaseConverter {
  constructor({ path, savePath }) {
    super({ path, savePath });
  }

  async execute() {
    return this.setExtension()
      .validate()
      .fileToBuffer()
      .then(async () => {
        return this.bufferToData()
          .createHeaders()
          .convert()
          .createFile()
          .then(() => this.returnSuccessfullyMessage());
      });
  }

  setExtension() {
    this.extension = 'csv';
    return this;
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

    return this;
  }

  createHeaders() {
    const headersArr = [];

    this.data.forEach((item) => {
      const keys = Object.keys(item);
      keys.forEach((key) => headersArr.push(key));
    });

    const setHeaders = new Set([...headersArr]);
    this.headers = Array.from(setHeaders);

    return this;
  }

  validate() {
    if (!this.path) throw new Error('path is required');
    if (!this.savePath) throw new Error('savePath is required');
    if (!this.path.includes('.json')) throw new Error('invalid file extension');

    return this;
  }

  bufferToData() {
    this.data = JSON.parse(this.file);
    return this;
  }
}

module.exports = ToCsv;
