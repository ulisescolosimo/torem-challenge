import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.routes";
import customerRoutes from "./routes/customer.routes";
import messagesRoutes from "./routes/message.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set("strictQuery", false);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.f3oilz7.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
  })
  .catch((err: any) => {
    console.log("An error has ocurred while connecting to database:", err);
  });

app.use(bodyParser.json());

app.use("/chats", chatRoutes);
app.use("/customer", customerRoutes);
app.use("/messages", messagesRoutes);
