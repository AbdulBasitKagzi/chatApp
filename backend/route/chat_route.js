const express = require("express");
const { createChat, getChat,uploadFile,getImage } = require("../controller/chat_controller");
const userId = require("../middleware/userId");
const upload=require("../controller/upload")
const chat_route = express.Router();

chat_route.post("/chat", userId, createChat);
chat_route.get("/getChat/:conversationId", userId, getChat);
chat_route.post("/post/file",upload.single('file'),uploadFile );
chat_route.get("/file/:filename",getImage );
module.exports = chat_route;
