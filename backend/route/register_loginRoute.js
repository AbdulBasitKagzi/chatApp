const express = require("express");
const { registerUser, LoginUser } = require("../controller/register_login");

const register_login = express.Router();

register_login.post("/post", registerUser);
register_login.post("/login", LoginUser);

module.exports = register_login;
