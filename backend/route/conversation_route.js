const express = require("express");
const {
  startConversation,
  getConverstaions,
} = require("../controller/conversation_chat");
const userId = require("../middleware/userId");

const conversationRoute = express.Router();

conversationRoute.post("/conversation", userId, startConversation);
conversationRoute.get("/getconversation", userId, getConverstaions);
module.exports = conversationRoute;
