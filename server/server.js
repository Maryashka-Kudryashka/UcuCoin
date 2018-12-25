const express = require("express");
const db = require("./db");
const user = require("./routes/user");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const url = "mongodb://localhost:27017/UCUCoinDB";
const expressSession = require('express-session');
const configPassport = require('./config/passport');
const passport = require('passport');
const settings = require('./config/settings');

module.exports.start = function (done) {
  configPassport();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(expressSession(({ secret: 'keyboard cat' })));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/user", user);

  db.connect(
    url,
    err => {
      if (err) {
        console.log("Unable to connect to Mongo.", err);
        process.exit(1);
      } else {
        console.log("Connected successfully to server");
      }
    }
  );

  app.listen(settings.port, function () {
    console.log("Listening on port " + settings.port);

    if (done) {
      return done(null, app);
    }
  }).on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
      console.log('Address in use. Is the server already running?');
    }
    if (done) {
      return done(e);
    }
  });
};

module.exports.start();

