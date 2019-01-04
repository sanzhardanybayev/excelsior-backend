const colors = require("colors"),
  http = require("http"),
  https = require("https"),
  config = require("../config"),
  fs = require("fs"),
  path = require("path");

const run = app => {
  const httpServer = http.createServer(app);

  const credentials = {
    key: fs.readFileSync(path.join(__dirname, "/./https/key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "/./https/cert.pem"))
  };

  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(config.httpPort, function() {
    console.log(
      "\x1b[36m%s\x1b[0m",
      "The HTTP server is running on port " +
        config.httpPort +
        ". Process ID = " +
        process.pid
    );
  });

  // Start the HTTPS server
  httpsServer.listen(config.httpsPort, function() {
    console.log(
      "\x1b[35m%s\x1b[0m",
      "The HTTPS server is running on port " +
        config.httpsPort +
        ". Process ID = " +
        process.pid
    );
  });
};

module.exports = run;
