import express from "express";
import controller from "../controllers/chat.controllers";

const router = express.Router();

router.get("/", controller.getChats);
router.get("/:id", controller.getChat);
router.post("/", controller.createChat);
router.delete("/:chatId", controller.deleteChat);
router.put("/:chatId", controller.updateChat);

export default router;
