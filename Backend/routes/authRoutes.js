import express from "express";
import { registerUser, loginUser, getHosts} from "../controllers/authController.js";

/*
Authentication Routes
This file contains all routes related to user authentication and user management.
Available Routes:
 Register a new user, Login an existing user, Get all employees (hosts) for appointment booking
*/

// Create Express Router
const router = express.Router();

// Register a New User, Creates a new user account after validating the details.
router.post("/register", registerUser);
// User Login,Authenticates the user and returns a JWT token.
router.post("/login", loginUser);
// Get All Hosts (Employees) Returns the list of employees who can act as hosts while booking appointments.
router.get("/hosts", getHosts);

export default router;