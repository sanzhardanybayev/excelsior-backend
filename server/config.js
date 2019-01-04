const middleware = require("./routes/middleware");

/**
 * @description Configure the server
 * @param app
 */
const configServer = app => {
  // Apply middleware and additional settings
  app.disable("etag").disable("x-powered-by");
  app.use(...middleware);
};

module.exports = configServer;
