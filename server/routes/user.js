const express = require("express");
const router = express.Router();
const db = require("../db");
const bodyParser = require('body-parser');
const passport = require('passport');

// users = [
//   {name: "Oles", surname: "Dobosevych", address: "0x68F074d6eFF2EfEDDa3dC36BeB1E238C3117c90F", email: "dobosevych@gmail.com", password: "teacher"},
//   {name: "Arsen", surname: "Senkivskiy", address: "0x8e5F67a644f87b6226EeBB0270764661Cfbff6C4", email: "senkivskiy@gmail.com", password: "student"},
//   {name: "Maryana", surname: "Mysak", address: "0x70AF8FD7Ff04BaF7473d213817D86805391E1Daf", email: "mysak@gmail.com", password: "student"},
// ]


// db.user.insertMany( [
//   {name: "Oles", surname: "Dobosevych", address: "0x68F074d6eFF2EfEDDa3dC36BeB1E238C3117c90F", email: "dobosevych@gmail.com", password: "teacher", role: "teacher"},
//   {name: "Arsen", surname: "Senkivskiy", address: "0x8e5F67a644f87b6226EeBB0270764661Cfbff6C4", email: "senkivskiy@gmail.com", password: "student", role: "student"},
//   {name: "Maryana", surname: "Mysak", address: "0x70AF8FD7Ff04BaF7473d213817D86805391E1Daf", email: "mysak@gmail.com", password: "student", role: "student"}
// ] );

const stripUser = (req, res, next) => {
  const user = { ...req.user };
  delete user.password;
  req.user = user;
  next();
};

router.get("/allusers", async (req, res) => {
  const users = await db
    .get()
    .collection("user")
    .find()
    .toArray();
  res.send(users);
});

// router.post('/auth', function (req, res, next) {
//   passport.authenticate('local', function (err, user, info) {
//     if (err) {
//       // res.send(res, 500, 'Ups. Something broke!');
//       console.log('err')
//       res.send({ result: null, error: true})
//     } else if (info) {
//       res.send({ result: null, error: true})
//     } else {
//       req.login(user, function (err) {
//         if (err) {
//           res.send({ result: null, error: true})
//         } else {
//           res.send({ result: req.user, error: false });
//         }
//       })
//     }
//   })(req, res, next);
// });

router.post("/auth",
  passport.authenticate('local'),
  stripUser,
  bodyParser.json(),
  async (req, res) => {
    res.send({ result: req.user, error: false });
    // let credentials = req.body
    // const user = await db
    // .get()
    // .collection("user")
    // .findOne({ email: credentials.email })
    // if (user) {
    //   res.send({result: user, error: false});
    // } else {
    //   res.send({error: true});
    // }
  }
);

router.post('/logout', function (req, res) {
  req.logout();
  res.send(({ status: 'OK' }));
});

router.get('/getCurrentUser',
  stripUser,
  function (req, res) {
    if (req.user._id) {
      res.send({ result: req.user, status: 'OK' });
    } else {
      res.send({ result: null, status: "NOT LOGINED" })
    }
  }
);

module.exports = router;
