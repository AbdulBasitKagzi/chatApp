const mongoose = require("mongoose");
const Chat = require("../models/chatModel");
const grid = require('gridfs-stream');

let gridFsBucket
let gfs;

const conn = mongoose.connection;
conn.once('open', () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs"
  })

  gfs = grid(conn.db, mongoose.mongo)
  gfs.collection('fs')
})


async function createChat(req, res) {
  try {
    console.log("body", req.body);
    const { chat, conversationId } = req.body;

    const createChat = await Chat.create({
      sender: req.userId,
      conversationId,
      chat,
    });
    // console.log("Chat", createChat);
    return res.status(200).json(createChat);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Look at console for error");
  }
}

async function getChat(req, res) {
  try {
    // console.log("id", req.userId);
    const getChat = await Chat.find({
      conversationId: req.params.conversationId,
    }).sort({ timestamps: -1 });
    if (getChat.length === 0) {
      return res.status(200).json({ message: "No messages found" });
    }
    // console.log("chat", getChat);
    return res.status(200).json(getChat);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Look at console for error");
  }
}

async function uploadFile(req, res) {

  if (!req.file) return res.status(400).json({ message: "File Not Found" })

  imageUrl = `http://localhost:4000/file/${req.file.filename}`

  return res.status(200).json({ url: imageUrl })
}

async function getImage(req, res) {
  try {

    const file = await gfs.files.findOne({ filename: req.params.filename })
  
    if (!file) return res.status(400).json({ message: "File Not Found" })

    const readStream = gridFsBucket.openDownloadStream(file._id)
    readStream.pipe(res)

  } catch (error) {
    console.log("error", error);
    return res.status(500).send("Look at console for error");
  }
}

module.exports = { createChat, getChat, uploadFile, getImage };
