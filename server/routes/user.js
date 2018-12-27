const express = require("express");
const router = express.Router();
const db = require("../db");
const bodyParser = require('body-parser');
const passport = require('passport');

// db.user.insertMany( [
//   {name: "Oles", surname: "Dobosevych", address: "0xeea8F2465405331C7DB3D1EE441911b75E9EF93F", email: "dobosevych@gmail.com", password: "admin", role: "admin"},
//   {name: "Andriy", surname: "Romaniuk", address: "0xe7B24e1546f85B419BddEB6Ed35C66feC091d49D", email: "romaniuk@gmail.com", password: "teacher", role: "teacher"},
//   {name: "Oleksiy", surname: "Datsiv", address: "0x2dC1E577852d8929894a5FdBAf0360225e431aCa", email: "datsiv@gmail.com", password: "teacher", role: "teacher"},
//   {name: "Arsen", surname: "Senkivskiy", address: "0x77441dBAf10914F6BFfAe25E6023a3dc99872124", email: "senkivskiy@gmail.com", password: "student", role: "student"},
//   {name: "Maryana", surname: "Mysak", address: "0xF5B19E164Ed1bB3b8D417d2e9A8C9726A4dD1dc9", email: "mysak@gmail.com", password: "student", role: "student"},
//   {name: "Olena", surname: "Skibinska", address: "0x33CbE8A41468A024A72326CC7d58733eAC8f4263", email: "skibinska@gmail.com", password: "student", role: "student"},
//   {name: "Yaryna", surname: "Korduba", address: "0x9f9425583104667D2E827ca5888807208d77A5a2", email: "korduba@gmail.com", password: "student", role: "student"},
//   {name: "Oles", surname: "Kozak", address: "0x1f725ECEB69F6C847964521D0daC1c952EABA2f2", email: "kozak@gmail.com", password: "student", role: "student"},
//   {name: "Olya", surname: "Bakay", address: "0x7d8331DB33767734c2bD534301F3178649E3c688", email: "bakay@gmail.com", password: "student", role: "student"}
// ] );

// const products = [
//   {name: "Winter school", price: "10"},
//   {name: "Cofee with Hrytsak", price: "20"},
//   {name: "Discount in Trapezna", price: "5"},
//   {name: "Ability to smoke everywhere", price: "40"},
//   {name: "Lecture with Prutyla", price: "10"},
//   {name: "Ticket for conference", price: "10"},
// ]

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
