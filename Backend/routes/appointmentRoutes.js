import express from "express";
import { createAppointment,getAppointments,approveAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.put("/:id/approve", approveAppointment);

export default router;