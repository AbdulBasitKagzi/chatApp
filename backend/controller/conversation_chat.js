const conversation = require("../models/coversationModel");

async function startConversation(req, res) {
  const userid = req.params.id;
  console.log("userid", userid);

  //   const { members, message } = req.body;

  try {
    const response = await conversation.create({
      members: [req.userId, req.body.id],
    });
    console.log("res", response);
    return res.status(200).json({ response, message: "conversation created" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "Look at console for error" });
  }
}

async function getConverstaions(req, res) {
  try {
    const convo = await conversation.find({
      members: { $in: [req.userId] },
    });

    if (convo.length === 0) {
      return res.status(400).json({ message: "No conversation found" });
    }
    console.log("conversation", convo);
    return res.status(200).json({ convo, message: "converstion is there" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "Look at console for error" });
  }
}

module.exports = { startConversation, getConverstaions };
