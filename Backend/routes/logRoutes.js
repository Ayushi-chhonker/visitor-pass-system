import express from "express";
import { checkIn , checkOut , getLogs } from "../controllers/logController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

/*
Visitor Log Routes: This file manages visitor entry and exit records.
It provides routes to: Record visitor check-in, Record visitor check-out, View all visitor logs.These routes are protected so that only authorizedusers can access them.
*/

//create express router
const router = express.Router();
//visitor check-in, Only Security staff can record visitor check-in
router.post("/checkin" ,checkIn);
//visitor check=out ,Only Security staff can record visitor check-out
router.put("/checkout/:id" , checkOut);
//View visitor logs, Admin and Security staff can view complete visitor logs
router.get("/", getLogs);

export default router;