const getParsedError = (error) =>
  JSON.stringify(error, Object.getOwnPropertyNames(error));

module.exports = { getParsedError };
