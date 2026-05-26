import express from "express";
import { checkIn , checkOut } from "../controllers/logController.js";

const router = express.Router();

router.post("/checkin" ,checkIn);
router.put("/checkout/:id" , checkOut);

export default router;