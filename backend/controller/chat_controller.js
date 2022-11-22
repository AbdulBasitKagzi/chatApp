const mongoose = require("mongoose");
const Chat = require("../models/chatModel");

async function createChat(req, res) {
  try {
    console.log("body", req.body);
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
    }).sort({ timestamps: -1 });
    if (getChat.length === 0) {
      return res.status(200).json({ message: "No messages found" });
    }
    console.log("chat", getChat);
    return res.status(200).json(getChat);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Look at console for error");
  }
}

module.exports = { createChat, getChat };
