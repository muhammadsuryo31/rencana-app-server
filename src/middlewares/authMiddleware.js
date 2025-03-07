const jwt = require("jsonwebtoken");
const { verifyToken } = require('../utils');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const decodedToken = await verifyToken({ token, secretKey: req.config.jwtSecret });
   
  delete decodedToken.iat && delete decodedToken.exp;
  req.user = decodedToken;
  
  next();
  } catch (err) {
    throw new HttpError('Invalid or expired token', 403)
  }
}

module.exports = authMiddleware;