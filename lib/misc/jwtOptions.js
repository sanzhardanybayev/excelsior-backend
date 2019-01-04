const ExtractJwt = require("passport-jwt").ExtractJwt,
  config = require("../../config");
let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_KEY;

module.exports = opts;
