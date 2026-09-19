import express from "express";
import {createAppointment,getAppointments,approveAppointment,checkInVisitor,checkOutVisitor} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin and employee can create appointments
router.post("/",authMiddleware,roleMiddleware("admin", "employee"),createAppointment
);

// Admin, employee and security can view appointments
router.get("/",authMiddleware,roleMiddleware("admin", "employee", "security"),getAppointments
);

// Only admin can approve appointments
router.put("/:id/approve",authMiddleware,roleMiddleware("admin"),approveAppointment
);

// Admin and security can check in visitors
router.put("/checkin/:id",authMiddleware,roleMiddleware("admin", "security"),checkInVisitor
);

// Admin and security can check out visitors
router.put( "/checkout/:id", authMiddleware, roleMiddleware("admin", "security"), checkOutVisitor);

export default router;