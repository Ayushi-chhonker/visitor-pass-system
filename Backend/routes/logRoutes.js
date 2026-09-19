import express from "express";
import { checkIn , checkOut , getLogs } from "../controllers/logController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

//security,admin and employee can only record visitor check-in
router.post("/checkin/:id",authMiddleware ,roleMiddleware("security","employee","admin") ,checkIn);

//security,admin and employee can only record visitor check-out
router.put("/checkout/:id",authMiddleware, roleMiddleware("admin","employee","security") , checkOut);

//only authorized staff can visit logs
router.get("/", getLogs);

export default router;