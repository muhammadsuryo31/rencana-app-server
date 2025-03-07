const bcrypt = require('bcryptjs');
const { HttpError } = require('../errors');

const hashPassword = async (plainPassword) => {
  try {
    const salt = 8;
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    return hashedPassword
  } catch (error) {
    console.log('error when hashing', error)
    throw new HttpError('failed to hash password', 500)
  }
}

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const matchPassword = await bcrypt.compare(plainPassword, hashedPassword);

    return matchPassword;
  } catch (error) {
    console.log('error when verifying password', error)
    throw new HttpError('failed to verify password', 500)
  }
}

module.exports = {
  hashPassword,
  verifyPassword
}