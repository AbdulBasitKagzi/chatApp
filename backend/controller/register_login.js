const user = require("../models/userModel");

const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const secret_key = "abdulbasitkagzi";

async function registerUser(req, res) {
  const { name, email, password, role } = req.body;

  try {
    //   validation
    if (name === "" || email === "" || password === "") {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    // creating user
    const newUser = await user.create({
      name,
      email,
      password,
      role,
    });
    const data = {
      user: user._id,
    };
    const token = jwt.sign(data, secret_key);
    console.log("gentoken", token);
    // sending response
    return res.status(200).json({ newUser, token, message: "User Created" });
  } catch (error) {
    //   internal server error
    console.log("register user  error", error);
    return res.status(400).send("Look at console for error");
  }
}

async function LoginUser(req, res) {
  const { email, password } = req.body;

  // validation
  try {
    if (email === "" || password === "") {
      return res.status(400).json({ message: "All fields must be filled" });
    }
    // finding user  from database
    const User = await user.findOne({
      email,
    });

    // const token = jwt.sign(data, secret_key);
    // throwing errors
    if (!User) {
      return res.status(400).json({ message: "User is not registered" });
    } else if (User.password !== password) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const data = {
      user: User._id,
    };
    // generating token
    const token = jwt.sign(data, secret_key);
    console.log("gentoken", token);
    // sending  response
    return res.status(200).json({ User, token, message: "User Logged in" });
  } catch (error) {
    //   internal server error
    console.log("register user  error", error);
    return res.status(400).send("Look at console for error");
  }
}

async function getUser(req, res) {
  try {
    const allUser = await user.find();
    if (!allUser) {
      return res.status(400).json({ message: "no user found" });
    }
    return res.status(200).json(allUser);
  } catch (error) {
    console.log("error");
    return res.status(400).send("Look at console for error.");
  }
}

// exports
module.exports = { registerUser, LoginUser, getUser };
