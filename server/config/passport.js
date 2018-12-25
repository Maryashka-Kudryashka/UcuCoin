const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require("../db");
const ObjectId = require('mongodb').ObjectId;

module.exports = () => {
  passport.use(new Strategy(
    async function(email, password, cb) {
      const user = await db
                        .get()
                        .collection("user")
                        .findOne({ email: email })
      // const [err, user] = await to(UserModel.findOne({ username }).select('+password'));
  
      // if (err) { return cb(err); }
      // if (!user) { return cb(null, false); }

      if (!user) { return cb(null, false) }

      if (user.password !== password) { 
        return cb(null, false);
      }

      return cb(null, user);
  }));

  // passport.use('local-signup', new Strategy(
  //   { passReqToCallback : true },
  //   async function(req, username, password, cb) {
  //     const [err, user] = await to(UserModel.findOne({ username }));
  //     if (err) { return cb(err); }
  //     if (user) { return cb(null, false) }

  //     const newUser = new UserModel(req.body);

  //     const [saveError] = await to(newUser.save());

  //     if (saveError) { return cb(err); }

  //     return cb(null, newUser);
  //   }
  // ));

  passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });
  
  passport.deserializeUser(async function(id, cb) {
    const user = await db.get().collection("user")
                  .findOne({ _id: ObjectId(id) });
  
    if (!user) return cb(new Error('deserialize error'));
  
    return cb(null, user);
  });
};

