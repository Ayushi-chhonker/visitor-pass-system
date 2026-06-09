import express from "express";
import { checkIn , checkOut } from "../controllers/logController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/checkin" ,checkIn);
router.put("/checkout/:id" , checkOut);

export default router;