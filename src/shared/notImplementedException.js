class NotImplementedException extends Error {
  constructor(functionName) {
    super(`the "${functionName}" function was not implemented!`);
    this.name = 'NotImplementedException';
  }
}

module.exports = NotImplementedException;
