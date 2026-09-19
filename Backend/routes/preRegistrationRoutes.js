import express from "express";
import {createPreRegistration,getPreRegistrations,approvePreRegistration,rejectPreRegistration} from "../controllers/preregistrationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


// Visitors can submit their details before visiting.This route is public because the visitor may not have an account.
router.post("/", createPreRegistration);

// Only authorized staff can view pre-registration requests.
router.get( "/",authMiddleware,roleMiddleware("admin", "employee", "security"),getPreRegistrations);

// Only admin can approve a pre-registration request.
router.put( "/approve/:id", authMiddleware,roleMiddleware("admin"),approvePreRegistration);

// Only admin can reject a pre-registration request.
router.put( "/reject/:id", authMiddleware, roleMiddleware("admin"), rejectPreRegistration);

export default router;