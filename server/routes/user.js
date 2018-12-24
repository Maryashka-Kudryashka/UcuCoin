const express = require("express");
const router = express.Router();
const db = require("../db");
var bodyParser = require('body-parser');

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

router.get("/allusers", async (req, res) => {
  const users = await db
    .get()
    .collection("user")
    .find()
    .toArray();
  res.send(users);
});

router.post("/auth", bodyParser.json(), async (req, res) => {
  let credentials = req.body
  const user = await db
  .get()
  .collection("user")
  .findOne({ email: credentials.email })
  if (user) {
    res.send({result: user, error: false});
  } else {
    res.send({error: true});
  }
})

module.exports = router;
