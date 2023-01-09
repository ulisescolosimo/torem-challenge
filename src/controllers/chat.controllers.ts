import ChatModel from "../models/chat.model";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const createChat = async (req: Request, res: Response) => {
  const { customer, isFavourite } = req.body;
  try {
    let createdChat = await new ChatModel({ customer, isFavourite });
    await createdChat.save();
    res.status(201).send(createdChat);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await ChatModel.find()
      .populate("messages")
      .populate("customer");
    res.status(200).send(chats);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;
    const deletedChat = await ChatModel.findByIdAndDelete(chatId);
    if (!deletedChat) {
      throw new Error(`Chat con ID ${chatId} no encontrado`);
    }
    return deletedChat;
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;
    const updates = req.body;
    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, updates, {
      new: true,
    });
    if (!updatedChat) {
      throw new Error(`Chat con ID ${chatId} no encontrado`);
    }
    return updatedChat;
  } catch (error) {
    res.status(500).send(error);
  }
};

const getChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.id;
    const chat = await ChatModel.findById(chatId)
      .populate("messages")
      .populate("customer");
    if (!chat) {
      throw new Error(`Chat with ID ${chatId} not found`);
    }
    res.send(chat);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
  createChat,
  getChats,
  deleteChat,
  updateChat,
  getChat,
};
