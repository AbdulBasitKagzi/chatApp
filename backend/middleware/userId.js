const jwt = require("jsonwebtoken");

const secret_key = "abdulbasitkagzi";

const userId = (req, res, next) => {

  const token = req.header("Authorization").replace("Bearer ", "")
  //  console.log("token from middleware", token);

  if (!token) {
    return res.status(400).json({ message: "User not logged in" });
  }
  try {
    //  console.log("token", token);
    const userId = jwt.verify(token, secret_key);
  
    req.userId = userId.user;
    next();
  } catch (error) {
    console.log("middleware error", error);
    return res.status(400).send("Look at console for error");
  }
};

module.exports = userId;
