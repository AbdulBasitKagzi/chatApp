const mongoose = require("mongoose");
const Chat = require("../models/chatModel");

async function createChat(req, res) {
  try {
    const { chat, conversationId } = req.body;

    const createChat = await Chat.create({
      sender: req.userId,
      conversationId,
      chat,
    });
    console.log("Chat", createChat);
    return res.status(200).json(createChat);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Look at console for error");
  }
}

async function getChat(req, res) {
  try {
    console.log("id", req.userId);
    const getChat = await Chat.find({
      conversationId: req.params.conversationId,
    });
    console.log("chat", getChat);
    return res.status(200).json(getChat);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Look at console for error");
  }
}

module.exports = { createChat, getChat };
