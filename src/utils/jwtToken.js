const jwt = require("jsonwebtoken");
const util = require('util');

const signAsync = util.promisify(jwt.sign);
const verifyAsync = util.promisify(jwt.verify);

const generateToken = async ({user, tokenExpiration, jwtSecret}) => {
  try {
    const token = await signAsync({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: tokenExpiration,
    });

    return token;
  } catch (error) {
    throw new Error('error while generating token')
  }
};

async function verifyToken({token, secretKey}) {
  try {
    const decoded = await verifyAsync(token, secretKey);

    return decoded;
  } catch (error) {
    console.log('error in verifying token', error.message);
    
    throw new Error(error.message)
  }
}

module.exports = {
  generateToken,
  verifyToken
};
