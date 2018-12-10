const express = require("express");
const router = express.Router();
const db = require("../db");

users = [
  { name: "Arsen", surname: "Senkivskiy" },
  { name: "Maryana", surname: "Mysak" }
];
router.get("/allusers", async (req, res) => {
  console.log("ho-hey");
  res.send(users);
});

module.exports = router;
