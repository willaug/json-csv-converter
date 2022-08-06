  ![Npm][npm-shield]
  ![ci][ci-shield]
  ![license][isc-license]
  [![LinkedIn][linkedin-shield]][linkedin-url]

  [npm-shield]: https://img.shields.io/npm/v/npm.svg?logo=npm
  [isc-license]: https://img.shields.io/badge/license-ISC-blue.svg
  [ci-shield]: https://github.com/willaug/json-csv-converter/actions/workflows/ci.yml/badge.svg
  [linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?&logo=linkedin&colorB=0A66C2
  [linkedin-url]: https://linkedin.com/in/william-augusto

# JsonCsvConverter
Convert JSON file to CSV file or vice versa

## 📖 About
This repository was created for convert files, that's it, it will create a new file with the new extension.

**Supported extensions**: CSV and JSON.

## 🚀 Getting Started
First, you need to install this package:
```bash
  npm install @willaug/json-csv-converter
```
or
```bash
  yarn add @willaug/json-csv-converter
```

Then, you will can call two functions to convert files:
```js
const { convertJsonToCsv } = require('@willaug/json-csv-converter');

// path: where the file to convert is (string)
// savePath: where the new file will be created (string)

const path = '../public/jsonfile.json';
const savePath = '../public';

const result = await convertJsonToCsv(path, savePath);
/**
  *  result = {
  *    message: 'success!',
  *    filename: 'ed90767a013c98dd.csv',
  *    filepath: '/home/yourUser/yourProject/public/ed90767a013c98dd.csv',
  *  }
  */
```
and 
```js
const { convertCsvToJson } = require('@willaug/json-csv-converter');

// path: where the file to convert is (string)
// savePath: where the new file will be created (string)

const path = '../public/csvfile.csv';
const savePath = '../public';

const result = await convertCsvToJson(path, savePath);
/**
  *  result = {
  *    message: 'success!',
  *    filename: 'ed90767a013c98dd.json',
  *    filepath: '/home/yourUser/yourProject/public/ed90767a013c98dd.json',
  *  }
  */
```

**Node versions supported**: 16v or highter.

## 💟 Thank you
Thanks for read this documentation and install this package. This repository was created for learning and you can contact me by the email <william.santos315@outlook.com> <3.