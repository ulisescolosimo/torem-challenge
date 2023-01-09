import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  timestamp: Date;
  isReceived: boolean;
  text: string;
  latitude: string;
  longitude: string;
}

const messageSchema = new Schema<Message>(
  {
    timestamp: { type: Date, required: true },
    isReceived: { type: Boolean, required: true },
    text: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  { discriminatorKey: "type" }
);

export const MessageModel = mongoose.model<Message>("Message", messageSchema);

export interface TextMessage extends Message {
  text: string;
}

export interface TextAndLocationMessage extends TextMessage, LocationMessage {}

export const TextAndLocationMessageModel =
  MessageModel.discriminator<TextAndLocationMessage>(
    "TextAndLocationMessage",
    new mongoose.Schema({})
  );

export const TextMessageModel = MessageModel.discriminator<TextMessage>(
  "TextMessage",
  new Schema({
    text: { type: String, required: true },
  })
);

export interface LocationMessage extends Message {
  latitude: string;
  longitude: string;
}

export const LocationMessageModel = MessageModel.discriminator<LocationMessage>(
  "LocationMessage",
  new Schema({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  })
);
