const configMiddleware = require('./configMiddleware');
const errorMiddleware = require('./errorMiddleware');
const authMiddleware = require('./authMiddleware');

module.exports = {
  configMiddleware,
  errorMiddleware,
  authMiddleware
}