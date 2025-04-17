const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const generateEnv = () => {
  const config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI.replace(
      '${DB_USERNAME}', process.env.DB_USERNAME
    ).replace(
      '${DB_PASSWORD}', process.env.DB_PASSWORD
    ).replace(
      '${DB_NAME}', process.env.DB_NAME
    ).replace(
      '${DB_APP_NAME}', process.env.DB_APP_NAME
    ),
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtVerificationSecret: process.env.JWT_VERIFICATION_SECRET,
    jwtTokenLifeCycle: process.env.JWT_TOKEN_LIFE_CYCLE,
    jwtRefreshTokenLifeCycle: process.env.JWT__REFRESH_TOKEN_LIFE_CYCLE,
    jwtVerificationTokenLifeCycle: process.env.JWT__VERIFICATION_TOKEN_LIFE_CYCLE,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    emailApps: process.env.EMAIL_APPS,
    emailPasswordApps: process.env.EMAIL_PASS_APPS,
    webAppBaseUrl: process.env.WEB_APP_BASE_URL,
    secureCookie: process.env.SECURE_COOKIE
  };

  return config
}

module.exports = generateEnv;