const envConfig = require('./envConfig');
const mongodbConfig = require('./mongodbConfig');
const DiConfig = require('./DiConfig');
const mailerConfig = require('./nodeMailerConfig');

const generateConfigs = async () => {
  const config = {
    ...envConfig(),
    services: DiConfig()
  }
  await mongodbConfig(config.mongoUri)
  const sendEmail = mailerConfig(config.emailApps, config.emailPasswordApps);
  config.sendEmail = sendEmail;

  return config;
}


module.exports = generateConfigs;
