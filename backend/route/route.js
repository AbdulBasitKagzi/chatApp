const express = require("express");
const registerUser = require("../controller/register_login");

const route = express.Router();

route.get("/", (req, res) => {
  console.log("route is working");
  res.status(200).json({ message: "rout e is working" });
});

module.exports = route;
