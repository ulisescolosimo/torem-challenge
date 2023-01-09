import mongoose, { Schema } from "mongoose";
import { ChatModel } from "../interfaces/Interfaces";

const chatSchema: Schema<ChatModel> = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  isFavourite: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<ChatModel>("chats", chatSchema);
