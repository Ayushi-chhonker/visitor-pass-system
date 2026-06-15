import express from "express";
import { checkIn , checkOut , getLogs } from "../controllers/logController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/checkin" ,checkIn);
router.put("/checkout/:id" , checkOut);
router.get("/", getLogs);

export default router;