import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import {
  Message,
  TextMessage,
  LocationMessage,
  MessageModel,
  TextAndLocationMessageModel,
} from "../models/message.model";
import ChatModel from "../models/chat.model";
import moment from "moment";
import "moment-timezone";

const createMessage = async (req: Request, res: Response) => {
  const chatId = req.params.chatId;

  const { isReceived, text, latitude, longitude } = req.body;

  const message = new MessageModel({
    timestamp: moment().tz("America/Argentina/Buenos_Aires").format(),
    isReceived,
    text,
    latitude,
    longitude,
  });

  await message.save();

  await ChatModel.findByIdAndUpdate(
    chatId,
    { $push: { messages: message } },
    { new: true }
  );

  res.send(message);
};

const getMessages = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  const chat = await ChatModel.findById(chatId).populate("messages");

  if (!chat) {
    return res.status(404).send("Chat not found");
  }

  res.send(chat.messages);
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.id;
    const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      throw new Error(`Message con ID ${messageId} no encontrado`);
    }
    return deletedMessage;
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
  createMessage,
  getMessages,
  deleteMessage,
};
