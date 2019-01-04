const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  path = require("path");

router.route("/404").get((req, res) => {
  const file = fs.readFileSync(
    `${path.join(__dirname, "/../../public/index.html")}`
  );
  res.setHeader("Content-Type", "text/html");
  res.send(file);
});

router.route("/project.ico").get((req, res) => {
  const file = fs.readFileSync(
    `${path.join(__dirname, "/../../public/project.ico")}`
  );
  res.setHeader("Content-Type", "image/x-icon");
  res.send(file);
});

router.route("/").get((req, res) => {
  const file = fs.readFileSync(
    `${path.join(__dirname, "/../../public/index.html")}`
  );
  res.setHeader("Content-Type", "text/html");
  res.send(file);
});

module.exports = {
  prefix: "/",
  routes: router
};
