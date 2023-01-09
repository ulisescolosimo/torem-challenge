import express from "express";
import controller from "../controllers/message.controllers";

const router = express.Router();

router.post("/:chatId", controller.createMessage);
router.get("/:chatId", controller.getMessages);
router.delete("/:id", controller.deleteMessage);

export default router;
