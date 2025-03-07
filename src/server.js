const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const generateConfigs = require('./config');
const { configMiddleware, errorMiddleware } = require('./middlewares');
const routes = require('./routes');

const serverApp = async () => {
  const app = express();
  const config = await generateConfigs(app);

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(configMiddleware(config));

  routes.forEach((route) => {
    app.use(route)
  })

  app.use(errorMiddleware);

  return app;
}

module.exports = serverApp;