import express from "express";
import { registerUser, loginUser, getHosts} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Registration and login are public because the user does not have a JWT token before authentication.
router.post("/register", registerUser);
router.post("/login", loginUser);

// Only logged-in users should be able to get the list of employees available as hosts for appointments.
router.get("/hosts", getHosts);

export default router;