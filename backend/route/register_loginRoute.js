const express = require("express");
const {
  registerUser,
  LoginUser,
  getUser,
  getCurrentUser
} = require("../controller/register_login");
const userId= require('../middleware/userId')

const register_login = express.Router();

register_login.post("/post", registerUser);
register_login.post("/login", LoginUser);
register_login.get("/getuser", getUser);
register_login.get("/getcurrentuser",userId,getCurrentUser)

module.exports = register_login;
