const { hashPassword, verifyPassword } = require('./hasherPassword');
const { generateToken, verifyToken } = require('./jwtToken');

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken
};
