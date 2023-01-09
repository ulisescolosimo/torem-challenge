import request from "supertest";
import express from "express";
import nock from "nock";

const app = express();

nock("http://localhost:3000").post("/chats").reply(201, {
  customer: "63a5de18e7a018cef79d1e7d",
  isFavourite: true,
  _id: "123456",
});

describe("createChat", () => {
  it("creates a new chat", async () => {
    const chatData = {
      customer: "63a5de18e7a018cef79d1e7d",
      isFavourite: true,
    };

    const res = await request("http://localhost:3000")
      .post("/chats")
      .send(chatData);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      customer: chatData.customer,
      isFavourite: chatData.isFavourite,
      _id: "123456",
    });
  });
});
