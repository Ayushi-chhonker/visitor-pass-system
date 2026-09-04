import express from "express";
import {createAppointment,getAppointments,approveAppointment,checkInVisitor,checkOutVisitor} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

/* Appointment Routes
This file contains all routes related to appointment
management.It allows authorized users to: Create appointments, View appointment records, Approve appointments, Record visitor check-in, Record visitor check-out
*/

// Create Express Router
const router = express.Router();

// Create Appointment:Only Admin and Employee can create appointments.
router.post( "/", authMiddleware, roleMiddleware("admin", "employee"),createAppointment);
// Get All Appointments:  Admin, Employee and Security staff can view appointments.
router.get("/",authMiddleware,roleMiddleware("admin", "employee", "security"),getAppointments);
// Approve Appointment: Only Admin is allowed to approve appointment requests.
router.put("/:id/approve",authMiddleware,roleMiddleware("admin"),approveAppointment);
// Visitor Check-In, Records the visitor's check-in time.
router.put("/checkin/:id",checkInVisitor);
// Visitor Check-Out, Records the visitor's check-out time.
router.put( "/checkout/:id",checkOutVisitor);
export default router;