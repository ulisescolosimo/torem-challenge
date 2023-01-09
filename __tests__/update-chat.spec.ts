import request from "supertest";
import express from "express";
import nock from "nock";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

nock("http://localhost:3000").patch("/chats/123456").reply(200, {
  customer: "63a5de18e7a018cef79d1e7d",
  isFavourite: false,
  _id: "123456",
});

describe("updateChat", () => {
  it("updates an existing chat", async () => {
    const chatData = {
      isFavourite: false,
    };

    const res = await request("http://localhost:3000")
      .patch("/chats/123456")
      .send(chatData);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      customer: "63a5de18e7a018cef79d1e7d",
      isFavourite: false,
      _id: "123456",
    });
  });
});
