const express = require("express");
const connectToMongo = require("./db");
const route = require("./route/route");
const cors = require("cors");
const register_login = require("./route/register_loginRoute");

// setting up server
const app = express();

app.use(express.json());
app.use(cors());
app.use(route);
app.use(register_login);
// connectio to mongo
connectToMongo();
app.listen(4000, () => {
  console.log("Server Started ");
});
