const mongoose = require("mongoose");
// require("dotenv").config({ path: "config.env" });

// function to connect to monogodb compass
const db =
  "mongodb+srv://abdulbasit:abdulbasit@chatapp.stkxcyo.mongodb.net/chat";
function connectToMongo() {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected (⌐■_■)"))
    .catch((err) => console.log(`${err}`));
}
module.exports = connectToMongo;
