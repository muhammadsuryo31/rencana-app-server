const config = require('../config');

const configMiddleware = (config) => {
  return (req, res, next) => {
    req.config = config;
    next();
  }
}

module.exports = configMiddleware;