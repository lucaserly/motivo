const process = require('process');

const getParsedError = (error) =>
  JSON.stringify(error, Object.getOwnPropertyNames(error));

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = { getParsedError, isDev };
