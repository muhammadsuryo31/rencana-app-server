require("dotenv").config();
const serverApp = require('./src/server');
const port = process.env.PORT;

(async () => {
  const app = await serverApp()
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
})
})();