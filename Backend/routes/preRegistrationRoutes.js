import express from "express";

import {createPreRegistration,getPreRegistrations,approvePreRegistration,rejectPreRegistration} from "../controllers/preregistrationController.js";

/*Pre-Registration Routes
Purpose=This file contains all routes related to visitorpre-registration.
It allows visitors to submit their details beforetheir visit and enables the administrator toapprove or reject those requests.*/

// Create Express Router
const router = express.Router();

// Submit Pre-Registration
// Visitors can submit their details before visiting.
router.post("/",createPreRegistration);
// View All Pre-Registrations, Returns all submitted pre-registration requests.
router.get( "/", getPreRegistrations);
// Approve Pre-Registration
// Approving a request automatically creates the visitor record and appointment.
router.put("/approve/:id",approvePreRegistration);
// Reject Pre-Registration
// Updates the request status to "rejected".
router.put( "/reject/:id",rejectPreRegistration);

export default router;