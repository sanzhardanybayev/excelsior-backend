const mongoose = require("mongoose"),
  sendEmail = require("../../lib/sendEmail");

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
});

userSchema.pre("save", function(next) {
  sendEmail(
    this.get("email"),
    "Registration is complete",
    "Thanks for the registration",
    "<h1> Thanks for the" + " registration </h1>"
  );
  next();
});

module.exports = mongoose.model("User", userSchema);
