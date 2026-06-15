import express from "express";
import { createAppointment,getAppointments,approveAppointment } from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/",authMiddleware,roleMiddleware("admin", "employee"),createAppointment);

router.get("/",authMiddleware,roleMiddleware("admin", "employee", "security"),getAppointments);

router.put("/:id/approve",authMiddleware,roleMiddleware("admin"),approveAppointment);
export default router;