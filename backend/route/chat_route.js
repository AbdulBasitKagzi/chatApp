const express = require("express");
const { createChat, getChat } = require("../controller/chat_controller");
const userId = require("../middleware/userId");

const chat_route = express.Router();

chat_route.post("/chat", userId, createChat);
chat_route.get("/getChat/:conversationId", userId, getChat);
module.exports = chat_route;
