import express from "express";

import {generatePass,getPasses,generatePassPDF,verifyPass} from "../controllers/passController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

/*
Visitor Pass Routes: This file contains all routes related to visitor pass management.
It allows authorized users to: Generate a visitor pass, View generated passes ,Download pass as PDF ,Verify a visitor pass using QR data*/

// Create Express Router
const router = express.Router();
//generate visitor pass Logged-in users can generate a visitor pass.
router.post("/",authMiddleware,roleMiddleware("admin", "employee"), generatePass);
// View All Passes, Returns all visitor passes stored in the database.
router.get("/",authMiddleware,roleMiddleware("admin", "employee", "security"), getPasses);
// Download Visitor Pass as PDF Only Admin and Security staff can download, the printable visitor pass.
router.get("/:id/pdf", authMiddleware, roleMiddleware("admin", "security"),generatePassPDF);
// Verify Visitor Pass, Verifies the QR-based visitor pass and updates the visitor's check-in/check-out status.
router.get("/verify/:visitorId/:appointmentId", authMiddleware, verifyPass);

export default router;