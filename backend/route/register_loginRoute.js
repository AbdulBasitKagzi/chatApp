const express = require("express");
const {
  registerUser,
  LoginUser,
  getUser,
} = require("../controller/register_login");

const register_login = express.Router();

register_login.post("/post", registerUser);
register_login.post("/login", LoginUser);
register_login.get("/getuser", getUser);

module.exports = register_login;
