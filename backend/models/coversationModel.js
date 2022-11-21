const mongoose = require("mongoose");

const conversationScehma = mongoose.Schema(
  {
    members: {
      type: Array,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const conversation = mongoose.model("converstaion", conversationScehma);
module.exports = conversation;
