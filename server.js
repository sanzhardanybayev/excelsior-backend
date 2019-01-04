/*
  @author - Danybayev Sanzhar
 */
const express = require("express"),
  routes = require("./server/routes/"),
  Database = require("./DB/"),
  run = require("./server/run"),
  config = require("./server/config"),
  appConfig = require("./config"),
  cluster = require("cluster"),
  os = require("os"),
  { PerformanceObserver, performance } = require("perf_hooks"),
  util = require("util"),
  debug = util.debuglog("performance"),
  open = require("open");

// Log out all the measurements
const obs = new PerformanceObserver(items => {
  items.getEntries().forEach(function(measurement) {
    debug("\x1b[33m%s\x1b[0m", measurement.name + " " + measurement.duration);
  });
  performance.clearMarks();
});
obs.observe({ entryTypes: ["measure"] });

performance.mark("Started creating the app");

// Instantiate Express instance
const app = express();

// Apply server configs and middleware
config(app);

// Instantiate connection to the Database per Cluster
Database.init();

// If we're on the master thread, start the background workers and the CLI
if (cluster.isMaster) {
  // Fork the process
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  // Attach routes to the app
  routes.map(route => {
    app.use(route.prefix, route.routes);
  });
  //Run servers
  run(app);
}

if (cluster.isMaster) {
  // Open app in the browser
  open(`${appConfig.API_URL}:${appConfig.httpPort}/`);
}

performance.mark("Finished creating the app");
performance.measure(
  "Beginning to end",
  "Started creating the app",
  "Finished creating the app"
);
