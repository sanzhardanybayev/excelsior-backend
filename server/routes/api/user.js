/**
 * @author Sanzhar Danybayev
 * @link https://github.com/sanzhardanybayev
 */
const User = require("../../../DB/Models/User"),
  express = require("express"),
  passport = require("passport"),
  hashPassword = require("../../../lib/hashPassword"),
  sendEmail = require("../../../lib/sendEmail"),
  generator = require("generate-password"),
  router = express.Router(),
  decode = require("jwt-decode"),
  ObjectID = require("mongodb").ObjectID,
  { to, genToken, getToken } = require("../../../lib/helper");

/**
 * @description Sign In user
 */
router
  .route("/login")
  .post(
    passport.authenticate("local", {
      failureRedirect: "/404",
      failureFlash: false
    }),
    (req, res) => {
      res.json({
        token: genToken(req.user.id),
        login: req.user.login
      });
    }
  )
  .get((req, res) => {
    res.send("Hello World!");
  });

/**
 * @description Sign up new user. On success -> send Email
 */
router.route("/registrate").post(async (req, res) => {
  const user = new User({
    ...req.body,
    password: hashPassword(req.body.password)
  });
  try {
    await user.save();
    res.status(200).json({
      msg: "success"
    });
  } catch (err) {
    console.log(err);
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(409).json({
        error: "Duplicate"
      });
    } else {
      res.status(409).json({
        error: err.message
      });
    }
  }
});

/**
 * @description Sign in user using JWT Strategy. On Success -> return user
 */
router
  .route("/signin")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send(req.user);
  });

/**
 * @description Delete user using JWT Strategy. On Success -> return user
 */
router
  .route("/delete")
  .post(passport.authenticate("jwt", { session: false }), async (req, res) => {
    // Get Visitors length
    const token = getToken(req);

    if (token) {
      const { id } = decode(token);
      if (id) {
        try {
          let user = await User.findOneAndRemove({ _id: new ObjectID(id) });

          if (!user) {
            return res.status(404).redirect("/404");
          } else {
            return res.status(204).send("User successfully deleted");
          }
        } catch (err) {
          return res.status(500).json({
            error: "Unknown server error when trying to delete User"
          });
        }
      }
    } else {
      res.status(409).send("Unauthorized");
    }
  });

/**
 * @description Reset password for the user.
 * @param email -> email to find user
 */
router.route("/reset").post(async (req, res) => {
  const email = req.body.email;
  const test = req.body.test;

  const [err, user] = await to(User.findOne({ email }));

  if (!err && user) {
    const { _id, email } = user;

    // Create new password
    const newPassword = generator.generate({
      length: 6,
      number: true,
      uppercase: true
    });

    // Hash password
    let hash = hashPassword(newPassword);
    // Find user
    const [hasErr, updatedUser] = await to(
      User.findOneAndUpdate({ _id }, { password: hash }, { new: true })
    );

    if (!hasErr && updatedUser) {
      await sendEmail(
        email,
        "Сброс пароля",
        `Ваш новый пароль - ${newPassword}`,
        `<p>Ваш новый пароль - <bold>${newPassword}</bold></p>`
      );
      res.json({
        success: true,
        password: test ? newPassword : ""
      });
    } else {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({
      msg: "Пользователь не найден"
    });
  }
});

module.exports = {
  prefix: "/api/user",
  routes: router
};
