const express = require("express");
const {
  startConversation,
  getConverstaions,
  searchUsers
} = require("../controller/conversation_chat");
const userId = require("../middleware/userId");

const conversationRoute = express.Router();

conversationRoute.post("/conversation", userId, startConversation);
conversationRoute.get("/getconversation", userId, getConverstaions);
conversationRoute.get("/searchUser/:id", userId, searchUsers);
module.exports = conversationRoute;
