const express = require("express");
const {
  registerUser,
  LoginUser,
  getUser,
  getCurrentUser,
  updateUserSettings
} = require("../controller/register_login");
const userId= require('../middleware/userId')

const register_login = express.Router();

register_login.post("/post", registerUser);
register_login.post("/login", LoginUser);
register_login.get("/getuser", getUser);
register_login.get("/getcurrentuser",userId,getCurrentUser)
register_login.patch("/updateusersettings",userId,updateUserSettings)

module.exports = register_login;
