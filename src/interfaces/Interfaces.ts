import mongoose, { Document } from "mongoose";

export abstract class Customer {
  firstName: string;
  lastName: string;
}

export abstract class Message {
  timestamp: Date;
  isReceived: boolean;
}

export class TextAndLocationMessage implements TextMessage, LocationMessage {
  timestamp: Date;
  isReceived: boolean;
  text: string;
  latitude: string;
  longitude: string;

  constructor(
    timestamp: Date,
    isReceived: boolean,
    text: string,
    latitude: string,
    longitude: string
  ) {
    this.timestamp = timestamp;
    this.isReceived = isReceived;
    this.text = text;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export interface LocationMessage extends Message {
  latitude: string;
  longitude: string;
}

export interface TextMessage extends Message {
  text: string;
}

export abstract class Chat {
  customer: Customer;
  messages: Message[];
  isFavourite: boolean;

  constructor(customer: Customer, messages: Message[], isFavourite: boolean) {
    this.customer = customer;
    this.messages = messages;
    this.isFavourite = isFavourite;
  }
}

export interface ChatModel extends Chat, Document {
  customer: Customer;
  messages: Message[];
  isFavourite: boolean;
}
