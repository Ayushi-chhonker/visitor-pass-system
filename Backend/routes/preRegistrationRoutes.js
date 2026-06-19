import express from "express";
import 
{ createPreRegistration,getPreRegistrations,approvePreRegistration,rejectPreRegistration }
 from "../controllers/preregistrationController.js";

 const router = express.Router();

 router.post("/", createPreRegistration);
 router.get("/", getPreRegistrations);
 router.put("/approve/:id", approvePreRegistration);
 router.put("/reject/:id", rejectPreRegistration);

 export default router;