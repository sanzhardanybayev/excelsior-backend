const mongoose = require("mongoose"),
  colors = require("colors");

mongoose.set("useCreateIndex", true);

const database = {
  init: () =>
    mongoose
      .connect(
        "mongodb://localhost:27017/my",
        { useNewUrlParser: true }
      )
      .then(
        () =>
          console.log(
            `Successfully connected to the Database for the process #${
              process.pid
            }`.green
          ),
        err => {
          console.log(
            `Could not establish connection to the database. Reason: ${
              err.name
            } `.red
          );
        }
      )
};

module.exports = database;
