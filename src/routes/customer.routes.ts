import express from "express";
import controller from "../controllers/customer.controllers";

const router = express.Router();

router.post("/", controller.createCustomer);
router.get("/", controller.getCustomers);
router.delete("/:id", controller.deleteCustomer);

export default router;
