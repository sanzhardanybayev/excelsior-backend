const cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  passport = require("./auth/index");

// Create Array of middleware
const middleware = [
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  passport.initialize(),
  cors(),
  morgan('combined')
];

// Add morgan on Development Mode
process.env.NODE_ENV === "development"
  ? middleware.push(require("morgan")("dev"))
  : null;

module.exports = middleware;
