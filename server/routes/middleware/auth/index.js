const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  JwtStrategy = require("passport-jwt").Strategy,
  bcrypt = require("bcrypt"),
  JwtOption = require("../../../../lib/misc/jwtOptions"),
  User = require("../../../../DB/Models/User");

// Authentication
passport.use(
  new JwtStrategy(JwtOption, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      });
    }
  )
);

module.exports = passport;
