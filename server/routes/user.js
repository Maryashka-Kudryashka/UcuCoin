const express = require("express");
const router = express.Router();
const db = require("../db");

users = [
  { name: "Arsen", surname: "Senkivskiy", publicKey: 01, balance: 100 },
  { name: "Maryana", surname: "Mysak", publicKey: 02, balance: 20 },
  { name: "Olya", surname: "Bakay", publicKey: 03, balance: 1000 },
  { name: "Oles", surname: "Kozak", publicKey: 04, balance: 300 },
  { name: "Yaryna", surname: "Korduba", publicKey: 05, balance: 50 },
  { name: "Olenka", surname: "Skibinska", publicKey: 06, balance:7 }
]

router.get("/allusers", async (req, res) => {
  res.send(users);
});

module.exports = router;
