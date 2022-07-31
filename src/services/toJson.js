/* eslint-disable arrow-body-style */
const BaseConverter = require('../shared/baseConverter');

class ToJson extends BaseConverter {
  constructor({ path, savePath }) {
    super({ path, savePath });
  }

  async execute() {
    return this.setExtension()
      .validate()
      .fileToBuffer()
      .then(() => {
        return this.bufferToData()
          .createHeaders()
          .convert()
          .createFile();
      });
  }

  setExtension() {
    this.extension = 'json';
    return this;
  }

  convert() {
    const [, ...lines] = this.data.split('\n').filter(Boolean);
    const mappedRows = [];

    lines.forEach((line) => {
      const row = line.split(',');
      const object = {};

      this.headers.forEach((header, index) => {
        const value = row[index];
        const valueIsNaN = isNaN(value);
        if (value === '') {
          object[header] = null;
          return;
        }

        object[header] = valueIsNaN ? value : Number(value);
      });

      mappedRows.push(object);
    });

    this.convertedContent = mappedRows;
    return this;
  }

  createHeaders() {
    const [headers] = this.data.split('\n');
    this.headers = headers.split(',');

    return this;
  }

  validate() {
    if (!this.path) throw new Error('path is required');
    if (!this.savePath) throw new Error('savePath is required');
    if (!this.path.includes('.csv')) throw new Error('invalid file extension');

    return this;
  }

  bufferToData() {
    this.data = this.file.toString('utf-8');
    return this;
  }
}

module.exports = ToJson;
