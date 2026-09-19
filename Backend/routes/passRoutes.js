import express from "express";
import {generatePass,getPasses,generatePassPDF,verifyPass} from "../controllers/passController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin and employee can generate visitor passes
router.post( "/", authMiddleware, roleMiddleware("admin", "employee"), generatePass);

// Admin, employee and security can view passes
router.get("/",authMiddleware, roleMiddleware("admin", "employee", "security"), getPasses);

// Admin and security can download the visitor pass PDF
router.get( "/:id/pdf", authMiddleware, roleMiddleware("admin", "security"), generatePassPDF);

// Admin and security can verify QR and check visitors in/out
router.get( "/verify/:visitorId/:appointmentId", authMiddleware, roleMiddleware("admin", "security"), verifyPass);

export default router;