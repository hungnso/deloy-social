const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    member: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    chat: [
      {
        userId: { type: mongoose.Types.ObjectId, ref: "user" },
        content: String
      }
    ],
  },
  {
    timestamps: true,
  }
);
const MessageModel = mongoose.model("message", messageSchema);
module.exports = MessageModel
