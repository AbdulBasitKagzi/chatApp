const mongoose = require("mongoose");

const chatScehma = mongoose.Schema(
  {
    sender: {
      type: String,
    },
    conversationId: {
      type: String,
    },
    chat: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatScehma);
module.exports = Chat;
