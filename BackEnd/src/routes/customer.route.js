import express from "express";
import { createCustomer,getCustomerCount } from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/create", createCustomer);
router.get("/getCustomerCount", getCustomerCount);


export default router;